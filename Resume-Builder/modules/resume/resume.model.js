const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String },
  startYear: { type: String, required: true },
  endYear: { type: String },
});

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  description: { type: String },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  techStack: [String],
  link: { type: String },
});

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one resume per user
    },
    personalInfo: {
      phone: { type: String },
      location: { type: String },
      linkedin: { type: String },
      github: { type: String },
      portfolio: { type: String },
      summary: { type: String },
    },
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    skills: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);

