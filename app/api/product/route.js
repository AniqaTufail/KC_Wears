import dbConnect from "@/utils/dbconnect";
import Product from "@/models/product";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    await dbConnect();

    const formData = await request.formData();

   
    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const discount = formData.get("discount") === "true" || formData.get("discount") === "yes";
    const discountprice = parseFloat(formData.get("discountprice") || 0);
    const colors = JSON.parse(formData.get("colors") || "[]");
    const sizes = JSON.parse(formData.get("sizes") || "[]");
    const category = formData.get("category");
    const industry = formData.get("industry");
    const stock = formData.get("stock") === "true"; 

    // Files from form-data
    const files = formData.getAll("images");
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No Images Found" }, { status: 400 });
    }

    const uploadedImages = [];

    // Upload all images to Cloudinary
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: "products"
      });

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    // Create product in MongoDB
    const newProduct = await Product.create({
      name,
      description,
      price,
      discount,
      discountprice, 
      colors,
      sizes,
      thumbnailurl: uploadedImages[0].url, 
      images: uploadedImages,
      category,
      industry,
      stock
    });

    return NextResponse.json({ success: true, product: newProduct });

  }catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload or Save Failure" }, { status: 500 });
  }
}



export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id"); 
    const category = searchParams.get("category");
    const industry = searchParams.get("industry");
    const minPrice = parseFloat(searchParams.get("minPrice")) || 0;
    const maxPrice = parseFloat(searchParams.get("maxPrice")) || Infinity;

    // If ID is provided → Get single product
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: "Invalid product ID" },
          { status: 400 }
        );
      }

      const product = await Product.findById(id)
        .populate("category")
        .populate("industry");

      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, product }, { status: 200 });
    }

    // Otherwise → Get all products with filters
    const filter = {
      price: { $gte: minPrice, $lte: maxPrice },
    };

    if (category && mongoose.Types.ObjectId.isValid(category)) {
      filter.category = new mongoose.Types.ObjectId(category);
    }

    if (industry && mongoose.Types.ObjectId.isValid(industry)) {
      filter.industry = new mongoose.Types.ObjectId(industry);
    }

    const products = await Product.find(filter)
      .populate("category")
      .populate("industry");

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to Fetch products" },
      { status: 500 }
    );
  }
}


export async function PATCH(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { id, ...updateData } = body;

    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid or missing product ID" },
        { status: 400 }
      );
    }

    // Convert category & industry to ObjectId if provided
    if (updateData.category && mongoose.Types.ObjectId.isValid(updateData.category)) {
      updateData.category = new mongoose.Types.ObjectId(updateData.category);
    }
    if (updateData.industry && mongoose.Types.ObjectId.isValid(updateData.industry)) {
      updateData.industry = new mongoose.Types.ObjectId(updateData.industry);
    }

    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request){
  try{
    await dbConnect();
    const { id } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)){
      return NextResponse.json(
        {error: "Invalid Product ID"},
        {status : 400}
      );}
      const product = await Product.findById(id);

      if (!product){
           return NextResponse.json(
          {error: "Product Not Found"},
          {status : 404}
        );
      }
      await Product.findByIdAndDelete(id);
      if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        if (image.public_id) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }
    }

      return NextResponse.json(
        {success: true , message: "Product Deleted Succesfully"},
        {status: 200}
      );
}catch(error){
  console.error(error);
  return NextResponse.json(
    {error: "Failed to delete product"},
    {status: 500}
  );
}
}