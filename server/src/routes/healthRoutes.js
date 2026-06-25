const express = require("express");
const router = express.Router();

const {
    getHealthStatus,getAboutInfo
} = require("../controllers/healthControllers");

router.get("/health", getHealthStatus);
router.get("/about",getAboutInfo);

module.exports = router;

