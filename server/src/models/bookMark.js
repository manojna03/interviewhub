const mongoose=require("mongoose");
const bookMarkSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question",
        required:true
    }
}, 
{
    timestamps:true,
})
const BookMark=mongoose.model("BookMark",bookMarkSchema);
module.exports=BookMark;