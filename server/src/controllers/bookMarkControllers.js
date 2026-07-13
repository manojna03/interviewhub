const mongoose = require("mongoose");
const BookMark = require("../models/bookMarkModel");
const Question = require("../models/question");


const createBookMark=async(req,res)=>{
    try{
        const {questionId}=req.body;
        const userId=req.user.id;
        if(!questionId || !userId){
            return res.status(400).json({
                success:false,
                message:"QuestionId and userId are required."
            })
        }
        if (!mongoose.Types.ObjectId.isValid(questionId)) {
            return res.status(400).json({
                success: false,
                 message: "Invalid Question ID."
                });
            }
        const question = await Question.findById(questionId);
        if(!question){
            return res.status(404).json({
                success:false,
                message:"Question not found."
            })
        }
        const existingBookMark = await BookMark.findOne(
            {user:userId,question:questionId});
        if(existingBookMark){
            return res.status(409).json({
                success:false,
                message:"BookMark already exists."
            })
        }
        const bookMark = await BookMark.create({
            user:userId,
            question:questionId
        });
        return res.status(201).json({
            success:true,
            message:"BookMark created successfully.",
            bookMark: await bookMark.populate("question", "title difficulty platform")
            .populate("user", "name")
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}
const getAllBookMarks=async(req,res)=>{
    try{
        const userId=req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page -1) * limit;
        const bookMarks=await BookMark.find({user:userId}).populate("question", "title difficulty platform").skip(skip).limit(limit)
        const totalBookMarks = await BookMark.countDocuments({user: userId});
        return res.status(200).json({
            success:true,
            message:"BookMarks fetched successfully",
            bookMarks,
            totalBookMarks,
            currentPage:page,
            totalPages:Math.ceil(totalBookMarks/limit)
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}
const deleteBookMarks=async(req,res)=>{
    try{
        const {id}=req.params;
        const userId=req.user.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success:false,
                message:"Invalid BookMark ID."
            })
        }
        const deletedBookMark = await BookMark.findOneAndDelete({
             _id: id,
              user: userId
            });
         if(!deletedBookMark){
            return res.status(404).json({
                success:false,
                message:"BookMark not found."
            })
        }
        return res.status(200).json({
            success:true,
            message:"BookMark deleted successfully.",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}
module.exports={createBookMark,getAllBookMarks,deleteBookMarks};