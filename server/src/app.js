const express = require("express");
const healthRoutes = require("./routes/healthRoutes");
const userRoutes = require("./routes/userRoutes");
const questionRoutes=require("./routes/questionRoutes");
const app = express();
app.use(express.json());
app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/sheets", require("./routes/sheetRoutes"));
app.use("/api/bookmarks", require("./routes/bookMarkRoutes"));
app.get("/", (req, res) => {
    res.send("Welcome to InterviewHub Backend 🚀");
});

module.exports = app;
