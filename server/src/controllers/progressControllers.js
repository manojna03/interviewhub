const mongoose = require("mongoose");
const Progress = require("../models/progressModel");
const Question = require("../models/question");

const ALLOWED_STATUS = ["started", "in_progress", "completed"];

const createProgress = async (req, res) => {
    try {
        const { questionId, status, notes } = req.body;
        const userId = req.user.id;
        // Validation
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
        if (!ALLOWED_STATUS.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status."
            });
        }
        // Check Question
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found."
            });
        }
        // Check existing progress
        const existingProgress = await Progress.findOne({
            user: userId,
            question: questionId
        });
        if (existingProgress) {
            existingProgress.status = status;
            if (notes !== undefined) {
                existingProgress.notes = notes;
            }
            existingProgress.solvedAt =
                status === "completed" ? new Date() : null;

            await existingProgress.save();

            await existingProgress.populate([
                {
                    path: "question",
                    select: "title difficulty platform"
                },
                {
                    path: "user",
                    select: "name"
                }
            ]);

            return res.status(200).json({
                success: true,
                message: "Progress updated successfully.",
                progress: existingProgress
            });
        }
        // Create new progress
        const progress = await Progress.create({
            user: userId,
            question: questionId,
            status,
            notes,
            solvedAt: status === "completed" ? new Date() : null
        });
        await progress.populate([
            {
                path: "question",
                select: "title difficulty platform"
            },
            {
                path: "user",
                select: "name"
            }
        ]);
        return res.status(201).json({
            success: true,
            message: "Progress created successfully.",
            progress
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

const getAllProgress = async (req, res) => {
    try {

        const userId = req.user.id;
        const {status, sort}=req.query;
        const { search } = req.query;
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);
        const skip = (page - 1) * limit;

        if (status && !ALLOWED_STATUS.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status."
            });
        }

        if (sort && !["latest", "oldest"].includes(sort)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sort option. Use latest or oldest."
            });
        }
        const matchStage = {user: new mongoose.Types.ObjectId(userId)};
        if(status){
            matchStage.status=status;
        }
        const pipeline = [{
            $match: matchStage
        },
        {
            $lookup: {
                from: "questions",
                localField: "question",
                foreignField: "_id",
                as: "questionData"
            }
        },
        {
            $unwind:"$questionData"
        }];
        if(search){
            pipeline.push({
                $match:{
                    "questionData.title":{
                        $regex: search,
                        $options: "i"
                    }
                }
            });
        }

        const sortOption = sort === "oldest" ? 1 : -1;
        pipeline.push({
            $facet: {
                data: [
                    {
                        $sort: {
                            updatedAt: sortOption
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: limit
                    }
                ],
                totalCount: [
                    {
                        $count: "count"
                    }
                ]
            }
        });
        const result = await Progress.aggregate(pipeline);

        const progressList = result[0]?.data || [];

        const totalFilteredProgress =result[0]?.totalCount[0]?.count || 0;

        const completedQuestions = await Progress.countDocuments({
            user: userId,
            status: "completed"
        });

        return res.status(200).json({
            success: true,
            message: "Progress fetched successfully.",
            progressList,
            totalFilteredProgress,
            completedQuestions,
            currentPage: page,
            totalPages: Math.ceil(totalFilteredProgress / limit),
            hasNextPage: page < Math.ceil(totalFilteredProgress / limit),
            hasPrevPage: page > 1
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

const getProgressByQuestion=async(req,res)=>{
    try{
        const userId = req.user.id;
        const { questionId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(questionId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Question ID."
            });
        }
        const questionProgress = await Progress.findOne({
            question: questionId,
            user:userId
        })
        .populate("question", "title difficulty platform")
        .populate("user", "name");
        if (!questionProgress) {
            return res.status(404).json({
            success: false,
            message: "Progress not found." });
        }
        return res.status(200).json({
            success: true,
            message: "Progress fetched successfully.",
            progress: questionProgress
        });
       
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
};

const deleteProgress=async (req,res)=>{
    try{
        const {questionId}=req.params;
        const userId = req.user.id;
        if (!mongoose.Types.ObjectId.isValid(questionId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Question ID."
            });
        }
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found."
            });
        }
        const progress = await Progress.findOne({
            question: questionId,
            user:userId
        })
        if (!progress) {
            return res.status(404).json({
            success: false,
            message: "Progress not found." });
        }
        await progress.deleteOne();
        return res.status(200).json({
            success:true,
            message:"Progress deleted successfully"
        })
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
};

const getProgressStats = async (req, res) => {
  try{
    const userId = req.user.id;
    const stats = await Progress.aggregate([
        {
            $match:{
                user:new mongoose.Types.ObjectId(userId)
            }
        },
        {
             $group: {
                 _id: "$status",
                 count: { $sum: 1}
                }
        }
        
    ]);
    const total = await Progress.countDocuments({user: userId});
    const formattedStats = {
    total:0,
    started: 0,
    in_progress: 0,
    completed:  0 };
    stats.forEach(item => {formattedStats[item._id] = item.count;});
    return res.status(200).json({
        success:true,
        stats: formattedStats
    });
}catch(error){
    console.error(error);

    return res.status(500).json({
        success:false,
        message:"Internal server error"
    });
}
};

module.exports = {
    createProgress,
    getAllProgress,
    getProgressByQuestion,getProgressStats
};
