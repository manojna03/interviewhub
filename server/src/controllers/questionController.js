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
module.exports = {
    createQuestion
};