const mongoose=require("mongoose");
const Progress=require("../models/progressModel");
const Question = require("../models/question");


const createProgress=async(req,res)=>{
    try{
        const {questionId,status, notes }=req.body;
        const userId=req.user.id;
        if(!questionId || !userId){
            return res.status(400).json({
                success:false,
                message:"QuestionId and userId are required."
            })
        }
        if (!questionId || !status) {
            return res.status(400).json({
                 success: false,
                  message: "QuestionId and status are required."
                });
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
        const existingProgress = await Progress.findOne(
                    {user:userId,question:questionId});
                if(existingProgress){
                    if (status !== undefined)
                        existingProgress.status = status;
                    if (notes !== undefined)
                         existingProgress.notes = notes;
                    if(status==="completed"){
                        existingProgress.solvedAt = Date.now();  
                    }else {
                        existingProgress.solvedAt = null;
                    }
                    await existingProgress.save();
                    return res.status(200).json({
                        success:true,
                        message:"Progress updated successfully.",
                        progress: await existingProgress.populate("question", "title difficulty platform")
                        .populate("user", "name")
                    });
                }
                const progress=await Progress.create({
                    user:userId,
                    question:questionId,
                    status,
                    notes,
                    solvedAt: status === "completed" ? new Date() : null

                })
                return res.status(201).json({
                    success:true,
                     message:"Progress created successfully.",
                     progress: await progress.populate("question", "title difficulty platform")
                     .populate("user", "name")
                     })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        });
    }
}