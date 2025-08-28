import mongoose from "mongoose";
const industriesSchema = new mongoose.Schema(
    {
       name : { type: String , required : true , trim: true},

       

    }

);
export default mongoose.models.Industries || mongoose.model("Industries", industriesSchema);