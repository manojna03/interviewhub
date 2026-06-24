const express=require("express");
const app=express();
app.get("/",(req,res)=>{
    res.send("Welcome to InterviewHub Backend 🚀");
});
app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});