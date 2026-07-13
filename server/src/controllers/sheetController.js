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
        const {name,description,category,logoUrl,questions}=req.body;
        const updateData={};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (category !== undefined) updateData.category = category;
        if (logoUrl !== undefined) updateData.logoUrl = logoUrl;
        if (questions !== undefined) updateData.questions = questions;

        if(Object.keys(updateData).length === 0){
            return res.status(400).json({
                success:false,
                message:"At least one field is required to update."
            })
        }
        if(name){
            const existingSheet = await Sheet.findOne({name,_id:{$ne:id}});
            if(existingSheet){
                return res.status(409).json({
                    success:false,
                    message:"Sheet with same name already exists."
                })
            }
        }

        const sheet=await Sheet.findByIdAndUpdate(id, updateData, {new:true});
        if(!sheet){
            return res.status(404).json({
                success:false,
                message:"Sheet not found."
            })
        }
        return res.status(200).json({
            success:true,
            message:"Sheet updated successfully",
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
const getAllSheets=async (req,res)=>{
    try{
        const sheets = await Sheet.find().select(
    "name description category logoUrl createdBy");
        return res.status(200).json({
            success:true,
            sheets:sheets.map(sheet=>({
                id:sheet._id,
                name:sheet.name,
                description:sheet.description,
                category:sheet.category,
                logoUrl:sheet.logoUrl,
                createdBy:sheet.createdBy
            }))
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}
const getSheetById=async (req,res)=>{
    try{
        const {id} = req.params;
        const sheet = await Sheet.findById(id)
    .populate("questions")
    .populate("createdBy", "name email");
        if(!sheet){
            return res.status(404).json({
                success:false,
                message:"Sheet not found."
            })
        }
        return res.status(200).json({
            success:true,
            sheet:{
                id:sheet._id,
                name:sheet.name,
                description:sheet.description,
                category:sheet.category,
                logoUrl:sheet.logoUrl,
                questions:sheet.questions,
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
const getSheetsByCategory=async (req,res)=>{
    try{
        const {category}=req.params;
        const sheets=await Sheet .find({category}).select("name description category logoUrl createdBy");
        if(sheets.length===0){
            return res.status(200).json({
                success:true,
                sheets:[]
            })
        }
        return res.status(200).json({
            success:true,
            sheets:sheets.map(sheet=>({
                id:sheet._id,
                name:sheet.name,
                description:sheet.description,
                category:sheet.category,
                logoUrl:sheet.logoUrl,
                createdBy:sheet.createdBy
            }))
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

const deleteSheet = async (req,res)=>{
    try{
        const {id}=req.params;
        const sheet=await Sheet.findByIdAndDelete(id);
        if(!sheet){
            return res.status(404).json({
                success:false,
                message:"Sheet not found."
            })
        }
        return res.status(200).json({
            success:true,
            message:"Sheet deleted successfully"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}
module.exports={createSheet, updateSheet, deleteSheet, getAllSheets, getSheetById, getSheetsByCategory};