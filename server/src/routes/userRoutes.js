/*const express=require("express");
const router=express.Router();

const{createUser,loginUser}=require("../controllers/userController");
router.post("/users", createUser);
router.post("/users/login", loginUser);
module.exports=router;*/
const express = require("express");
const router = express.Router();

const { createUser, loginUser,getProfile,updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/profile",authMiddleware,getProfile);
router.put("/profile", authMiddleware, updateProfile);
module.exports = router;
