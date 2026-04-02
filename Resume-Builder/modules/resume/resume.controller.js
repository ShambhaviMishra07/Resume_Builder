const Resume = require("./resume.model");

//@route  POST /resume
//@desc   create resume for logged in user
const createResume = async (req, res) => {
    try {
      //check if resume already exists for this user
      const existingResume = await resume.findOne({ user : req.user._id });
      if( existingResume ){
        return res.status(400).json({
            message : "Resume already exists. use PUT /resume to update it.",

        });
      }
      const {personalInfo, education, experience, projects, skills } = req.body;

      const resume = await Resume.create({
        user: req.user._id,
        personalInfo,
        education,
        experience,
        projects,
        skills,
      });

      res.status(201).json({
        message: "Resume created successfully",
        resume,
      });
    } catch (error){
        res.status(500).json({message : "Server error", error: error.message});
    }
};

// @route  GET /resume
// @desc   Get logged in user's resume
const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ user: req.user._id }).populate(
            "user",
            "name email"
        );

        if (!resume){
            return res.status(404).json({
                message: "No resume found. Create one using POST /resume"
            });
        }

        res.status(200).json({ resume });
    } catch (error){
        res.status(500).json({message : "Server error", error: error.message});
    }
};

// @route PUT /resume
// @desc  update logged in user's resume
const updateResume = async (req, res) =>{
    try{
        const resume = await Resume.findOne({ user : req.user._id});

        if(!resume){
            return res.status(404).json({
                message: "No resume found. Create one using POST /resune first.",
            });
        }
        const {personalInfo, education, experience, projects, skills } = req.body;

        //only update fields that are sent in the request
        if(personalInfo) resume.personalInfo = personalInfo;
        if(education) resume.education = education;
        if(experience) resume.experience = experience;
        if(projects) resume.projects = projects;
        if(skills) resume.skills = skills;

        const updateResume = await resume.save();

        res.status(200).json({
            message : "resume updated successfully",
            resume : updateResume,
        });
    } catch (error){
        res.status(500).json({ message : "Server error", error: error.message});
    }
};

// @route GET /resume/:userId
// @desc  GET any user's resume by userId (public - no auth needed)
const getResumeByUserId= async (req, res) => {
    try{
        const resume = await Resume.findOne({ user: req.params.userId }).populate(
            "user",
            "name email"
        );

        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }

        res.status(200).json({ resume });
    } catch (error){
        res.status(500).json({ message : "Server error", error: error.message });
    }
};

module.exports = {createResume, getResume, updateResume, getResumeByUserId};