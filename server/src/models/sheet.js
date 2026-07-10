const mongoose = require('mongoose');
const sheetSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    logoUrl:{
        type:String,
        trim:true
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        timestamps: true
    },
    updatedAt:{
        timestamps: true
    }

})
module.exports = mongoose.model("Sheet", sheetSchema);