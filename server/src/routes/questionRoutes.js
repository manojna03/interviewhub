const express = require('express');
const router = express.Router();

const {createQuestion}=require('../controllers/questionController');
const authMiddleware=require('../middleware/authMiddleware');

router.post('/',authMiddleware,createQuestion);
module.exports=router;
