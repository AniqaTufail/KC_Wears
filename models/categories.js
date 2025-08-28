import mongoose from "mongoose";
const categoriesSchema = new mongoose.Schema(
    {
       name : { type: String , required : true , trim: true},

       

    }

);
export default mongoose.models.Categories || mongoose.model("Categories", categoriesSchema);