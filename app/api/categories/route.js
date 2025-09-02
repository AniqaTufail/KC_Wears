import dbConnect from "@/utils/dbconnect";
import Categories from "@/models/categories";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import product from "@/models/product";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const newCategory = await Categories.create({ name });

    return NextResponse.json(
      { success: true, data: newCategory },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(){
  try{
    await dbConnect();
    const categories = await Categories.find();
    return NextResponse.json({success: true, categories},{status: 200});
  }catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
export async function PATCH(request) {
  try {
    await dbConnect();
    const { id, name } = await request.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid or missing category ID" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, category: updatedCategory }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}
export async function DELETE(request) {
  try {
    await dbConnect();

    const { id } = await request.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid or missing category ID" },
        { status: 400 }
      );
    }
    await product.deleteMany({ category: id });
    

    const deletedCategory = await Categories.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

