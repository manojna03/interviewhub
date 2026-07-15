const express = require("express");
const router = express.Router();

const{
    createProgress,
    getAllProgress,
    getProgressByQuestion}=  require("../controllers/progressControllers");
    
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createProgress);
router.get("/", authMiddleware, getAllProgress);
router.get("/:questionid", authMiddleware, getProgressByQuestion);

module.exports = router;