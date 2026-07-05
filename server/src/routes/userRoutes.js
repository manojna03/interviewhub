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

router.post("/users", createUser);
router.post("/users/login", loginUser);
router.get("/users/profile",authMiddleware,getProfile);
router.put("/users/profile", authMiddleware, updateProfile);
module.exports = router;
