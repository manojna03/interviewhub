const Question = require("../models/question");
const createQuestion = async (req,res)=>{
    try{
        const{
            title,
            platform,
            difficulty,
            topics,
            sheet,
            companies,
            problemUrl,
            expectedTimeComplexity,
            expectedSpaceComplexity,
            interviewTips,
            commonMistakes
        }=req.body;
        const validationError = !title || !platform || !difficulty || !problemUrl;
        if(validationError){
            return res.status(400).json({
                success:false,
                message:"Title, platform, difficulty and problemUrl are required."
            })
        }
        const existingQuestion = await Question.findOne({title, platform});
        if (existingQuestion){
            return res.status(409).json({
                success:false,
                message:"Question with same title and platform already exists."
            });
        }
        const question = await Question.create({
            title,
            platform,
            difficulty,
            topics,
            sheet,
            companies,
            problemUrl,
            expectedTimeComplexity,
            expectedSpaceComplexity,
            interviewTips,
            commonMistakes
        });
        return res.status(201).json({
            success:true,
            message:"Question created successfully",
            question:{
                id:question._id,
                title:question.title,
                platform:question.platform,
                difficulty:question.difficulty,
                topics:question.topics,
                sheet:question.sheet,
                companies:question.companies,
                problemUrl:question.problemUrl,
                expectedTimeComplexity:question.expectedTimeComplexity,
                expectedSpaceComplexity:question.expectedSpaceComplexity,
                interviewTips:question.interviewTips,
                commonMistakes:question.commonMistakes
            }
        })
        }
        catch(error){
            console.error(error);
            return res.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
    }
const getAllQuestions = async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page -1) * limit;
        const questions = await Question.find().select("title difficulty platform").skip(skip).limit(limit);
        const totalQuestions = await Question.countDocuments();
        return res.status(200).json({
            success:true,
            message:"Questions fetched successfully",
            questions,
            totalQuestions,
            currentPage:page,
            totalPages:Math.ceil(totalQuestions/limit)
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const getQuestionById = async (req,res)=>{
    try{
        const {id} = req.params;
        const question = await Question.findById(id);
        if(!question){
            return res.status(404).json({
                success:false,
                message:"Question not found"
            })
        }
        return res.status(200).json({
            success:true,
            question:{
                id:question._id,
                title:question.title,
                platform:question.platform,
                difficulty:question.difficulty,
                topics:question.topics,
                sheet:question.sheet,
                companies:question.companies,
                problemUrl:question.problemUrl,
                expectedTimeComplexity:question.expectedTimeComplexity,
                expectedSpaceComplexity:question.expectedSpaceComplexity,
                interviewTips:question.interviewTips,
                commonMistakes:question.commonMistakes
            }
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const updateQuestion = async (req,res)=>{
    try{
        const {id} = req.params;
        const {
            title,
            difficulty,
            topics,
            companies,
            interviewTips,
            commonMistakes} = req.body;
        const updateData = {title,difficulty,topics,companies,interviewTips,commonMistakes};
        if(Object.keys(updateData).length === 0){
            return res.status(400).json({
                success:false,
                message:"No data provided for update"
            })
        }
        const question = await Question.findByIdAndUpdate(id,updateData,{new:true});
        if(!question){
            return res.status(404).json({
                success:false,
                message:"Question not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Question updated successfully",
            question
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const deleteQuestion = async (req,res)=>{
    try{
        const {id}=req.params;
        const question=await Question.findByIdAndDelete(id);
        if(!question){
            return res.status(404).json({
                success:false,
                message:"Question not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Question deleted successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};