const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const resumeRoutes = require("./modules/resume/resume.routes");

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/resume", resumeRoutes);

//Routes
const authRoutes = require("./modules/auth/auth.routes");
app.use("/auth", authRoutes);

app.use("/resume", resumeRoutes);

//Health check
app.get("/" , (req, res) => {
    res.json({message : "Resume Builder API is running"});

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})