const Sheet= require('../models/sheet');
const createSheet = async (req,res)=>{
    try{
        const {name,description,category,logoUrl,questions}=req.body;
        const createdBy = req.user.id;
        const validationError = !name|| !description || !category || !createdBy;
        if(validationError){
            return res.status(400).json({
                success:false,
                message:"Name, description, category and createdBy are required."
            })
        }
        const existingSheet = await Sheet.findOne({name});
        if(existingSheet){
            return res.status(409).json({
                success:false,
                message:"Sheet with same name already exists."
            })
        }
        const sheet=await Sheet.create({
            name,
            description,
            category,
            logoUrl,
            questions,
            createdBy
        });
        return res.status(201).json({
            success:true,
            message:"Sheet created successfully",
            sheet:{
                id:sheet._id,
                name:sheet.name,
                description:sheet.description,
                category:sheet.category,
                logoUrl:sheet.logoUrl,
                createdBy:sheet.createdBy
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}
const updateSheet = async (req,res)=>{
    try{
        const{id}=req.params;
        
    }
}
module.exports={createSheet};