const express = require("express");
const router = express.Router();

const{
    createResume,
    getResume,
    updateResume,
    ggetResumeByUserId,
    getResumeByUserId,
} = require("./resume.controller");
const { protect } = require("../../middleware/auth.middleware");

//Protected routes (need JWT token)
router.post("/", protect, createResume);
router.get("/", protect, getResume);
router.put("/", protect, updateResume);

//public route (no token needed - for shareable resume link)
router.get("/:userId", getResumeByUserId);

module.exports = router;
