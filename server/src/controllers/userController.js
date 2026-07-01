const User = require("../models/User");
const bcrypt=require("bcrypt");
const createUser = async (req, res) => {
    try {
        // Extract user data from the request body
        const {
            name,
            email,
            password,
            college,
            branch,
            graduationYear
        } = req.body;
        const validationError = !name || !email || !password;
        if(validationError){
            return res.status(400).json({
                success:false,
                message:"Name, email and password are required."
            })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success:false,
                message:"Validation failed",
                errors:{
                    "email":"Invalid email format"
                }
            })

        }
        const existingUser = await User.findOne({ email});
        if (existingUser){
            return res.status(409).json({
                success:false,
                message:"Email already exists."
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        // Create and save the user in MongoDB
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            college,
            branch,
            graduationYear
        });

        // Send success response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                college:user.college,
                branch:user.branch,
                graduationYear:user.graduationYear
            }
        });

    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and password are required."
            })
        }
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password."
            })
        }
        const passwordMatch=await bcrypt.compare(password,existingUser.password);
        if(!passwordMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Login successful"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
module.exports = {
    createUser,loginUser
};