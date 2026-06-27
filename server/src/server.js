require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3001;
console.log(process.env.MONGODB_URI);
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});