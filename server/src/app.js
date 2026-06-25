const express = require("express");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.use("/api", healthRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to InterviewHub Backend 🚀");
});

module.exports = app;