const express = require("express");
const router = express.Router();

const {
    createBookMark,
    getAllBookMarks,
    deleteBookMarks
} = require("../controllers/bookMarkControllers");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createBookMark);
router.get("/", authMiddleware, getAllBookMarks);
router.delete("/:id", authMiddleware, deleteBookMarks);

module.exports = router;