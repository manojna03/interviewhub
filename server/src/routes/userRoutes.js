const express=require("express");
const router=express.router();

const{createUser}=require("../controllers/userController");
router.post("/users", createUser);
module.exports=router;