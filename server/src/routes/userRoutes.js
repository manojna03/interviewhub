/*const express=require("express");
const router=express.Router();

const{createUser,loginUser}=require("../controllers/userController");
router.post("/users", createUser);
router.post("/users/login", loginUser);
module.exports=router;*/
const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controllers/userController");

router.post("/users", createUser);
router.post("/users/login", loginUser);

module.exports = router;
