const express = require("express");
const healthRoutes = require("./routes/healthRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(express.json());
app.use("/api", healthRoutes);
app.use("/api", userRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to InterviewHub Backend 🚀");
});

module.exports = app;