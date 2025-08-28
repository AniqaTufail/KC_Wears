import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
       name : { type: String , required : true},

       description : { type : String , required: true},

       price: { type : Number , required: true},

       discount: { type : Boolean , default: false},

       discountprice: { type : Number },

       colors : { type : [String] , default: [] },

       sizes : { type : [String] , default: []},

       thumbnailurl : { type : String , required : true},

       images : { type : [String] , required : true },

       category : { type : mongoose.Schema.Types.ObjectId, required : true },

       industry : { type : mongoose.Schema.Types.ObjectId , required : true},

       stock : { type : Boolean , required : true }



    




    }

);
export default mongoose.models.Product || mongoose.model("Product", productSchema);