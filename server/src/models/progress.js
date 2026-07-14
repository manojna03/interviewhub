const mongoose = require("mongoose");
const progressSchema = new mongoose.Schema(
    {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question",
        required:true
    },
    status:{       
        type:String,
        enum:["started","in_progress","completed"],
        required:true
    },
    notes:{
        type:String

    },
    solvedAt:{
        type: Date,
        default: null
    }

},
{
    timestamps:true,
})
progressSchema.index({user:1,question:1},{unique:true});
const Progress=mongoose.model("Progress",progressSchema);
module.exports=Progress;
