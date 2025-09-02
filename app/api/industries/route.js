import dbConnect from "@/utils/dbconnect";
import Industries from "@/models/industries";
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

    const newIndustry = await Industries.create({ name });

    return NextResponse.json(
      { success: true, data: newIndustry },
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
    const industries = await Industries.find();
    return NextResponse.json({success: true, industries},{status: 200});
  }catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch industries" },
      { status: 500 }
    );
  }
}
export async function PATCH(request) {
  try {
    await dbConnect();
    const { id, name } = await request.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid or missing industry ID" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Industry name is required" }, { status: 400 });
    }

    const updatedIndustry = await Industries.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedIndustry) {
      return NextResponse.json({ error: "Industry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, category: updatedIndustry }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update industry" }, { status: 500 });
  }

}
export async function DELETE(request) {
  try {
    await dbConnect();

    const { id } = await request.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid or missing industry ID" },
        { status: 400 }
      );
    }

    await product.deleteMany({ industry: id });

    const deletedIndustry = await Industries.findByIdAndDelete(id);

    if (!deletedIndustry) {
      return NextResponse.json(
        { error: "Industry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Industry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete industry" },
      { status: 500 }
    );
  }
}

