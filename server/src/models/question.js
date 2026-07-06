const mongoose=require("mongoose");
const questionSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    platform: {
        type: String,
        required: true,
        enum: [
            "LeetCode",
            "GeeksForGeeks",
            "Codeforces",
            "CodeChef"
        ]
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },
    topics: [{
        type: String,
        trim: true}],
    sheet: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Sheet"
        },
    companies: [{
        type: String,
        trim: true}],
    problemUrl: {
        type: String,
        required: true,
        trim: true
    },
    expectedTimeComplexity: {
        type: String,
        trim: true
    },
    expectedSpaceComplexity: {
        type: String,
        trim: true
    },
    interviewTips: {
        type: String,
        trim: true
    },
    commonMistakes: [{
        type:String,
        trim:true
    }],

},{
    timestamps: true
});
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;