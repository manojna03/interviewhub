const express=require("express");
const router=express.Router();

const {createSheet,
       updateSheet,
       deleteSheet,
       getAllSheets,
       getSheetById,
       getSheetsByCategory}=require("../controllers/sheetController");

const authMiddleware=require("../middleware/authMiddleware");

router.post("/",authMiddleware,createSheet);
router.get("/",authMiddleware,getAllSheets);
router.get("/:id",authMiddleware,getSheetById);
router.put("/:id",authMiddleware,updateSheet);
router.delete("/:id",authMiddleware,deleteSheet);
router.get("/category/:category",authMiddleware,getSheetsByCategory);

module.exports=router;
