const asynchandler = require('express-async-handler');
const { Project, validateCreateProject, validateUpdateProject } = require('../models/Project');
const { handleImageUpload, cloudinaryRemoveImage } = require('../utils/cloudinary');

/**-----------------------------------------------
 * @desc   Create New Project
 * @route  POST /api/projects 
 * @method  POST
 * @access  Private (Admin)
 -------------------------------------------------*/
 module.exports.createNewProjectCtrl = asynchandler(async (req, res) => {
    //validation for Image
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
    }
    // ✅ حوّل techStack إلى Array
    if (req.body.techStack && typeof req.body.techStack === "string") {
        req.body.techStack = JSON.parse(req.body.techStack);
    }
    //Validation For Date
    const { error } = validateCreateProject(req.body || {});
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // If The Same Title Exists
    const existingProject = await Project.findOne({ title: req.body.title });
    if (existingProject) {
        return res.status(400).json({ message: "Project with this title already exists" });
    }
    // Handle Image Upload And Save Project
    try {
        const fileBuffer = req.file.buffer;
        const imageInfo = await handleImageUpload(fileBuffer);
    
        req.body.image = {
            url: imageInfo.secure_url,
            publicId: imageInfo.public_id,
        };
    
        } catch (error) {
            console.error("Error uploading image:", error);
            return res.status(500).json({ message: "Error uploading image" });
        }


 
    // Create new Project
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        techStack: req.body.techStack,
        githubLink: req.body.githubLink,
        liveDemo: req.body.liveDemo,
        image: req.body.image,
        category: req.body.category,
        user: req.user.id,
    });
    await project.save();
    res.status(201).json({ message: "Project Created Successfully", data: project });

 });

/**-----------------------------------------------
 * @desc   Get all projects
 * @route  GET /api/projects 
 * @method  GET
 * @access  Public
 -------------------------------------------------*/
 module.exports.getAllProjectsCtrl = asynchandler(async (req, res) => {
    const {category} = req.query;
    const projects =  await Project.find(category ? { category } : {}).sort({ createdAt: -1 });
    res.status(200).json(projects);
 });
 /**-----------------------------------------------
 * @desc   Get Single Project
 * @route  GET /api/projects/:id
 * @method  GET
 * @access  Public
 -------------------------------------------------*/
 module.exports.getSingleProjectCtrl = asynchandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
 });

  /**-----------------------------------------------
 * @desc   Update  Project Data
 * @route  PUT /api/projects/:id
 * @method  PUT
 * @access  Private (Admin)
 -------------------------------------------------*/
 module.exports.updateProjectCtrl = asynchandler(async (req, res) => { 
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    const { error } = validateUpdateProject(req.body || {});
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    // If The Same Title Exists For Another Project
    if (req.body.title && req.body.title !== project.title) {
        const existingProject = await Project.findOne({ title
        : req.body.title });
        if (existingProject) {
            return res.status(400).json({ message: "Project with this title already exists" });
        }
    }
    // Update Project Data
    Object.assign(project, req.body);
    await project.save();
    res.status(200).json({ message: "Project Updated Successfully", data: project });
    });

/**-----------------------------------------------
 * @desc   Update  Project Image
 * @route  PUT /api/projects/:id/image
 * @method  PUT
 * @access  Private (Admin)
 -------------------------------------------------*/
module.exports.updateProjectImageCtrl = asynchandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
    }
    try {
        // Remove old image from Cloudinary
        if (project.image && project.image.publicId) {
            await cloudinaryRemoveImage(project.image.publicId);
        }
        // Upload new image to Cloudinary
        const fileBuffer = req.file.buffer;
        const imageInfo = await handleImageUpload(fileBuffer);
        // Update project image data
        project.image = {
            url: imageInfo.secure_url,
            publicId: imageInfo.public_id,
        };
        await project.save();
        res.status(200).json({ message: "Project Image Updated Successfully", data: project });
    } catch (error) {
        console.error("Error updating project image:", error);
        res.status(500).json({ message: "Error updating project image" });
    }
});

/**-----------------------------------------------
 * @desc   Delete  Project 
 * @route  DELETE /api/projects/:id
 * @method  DELETE
 * @access  Private (Admin)
 -------------------------------------------------*/
 module.exports.deleteProjectCtrl = asynchandler(async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    // Remove project image from Cloudinary
    if (project.image && project.image.publicId) {
        await cloudinaryRemoveImage(project.image.publicId);
    }
    // Remove project from database
        await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Project Deleted Successfully" });
    });

/**-----------------------------------------------
 * @desc   Get Projects Count
 * @route  GET /api/projects/count
 * @method  GET
 * @access  Private (Admin)
 -------------------------------------------------*/
module.exports.getProjectsCountCtrl = asynchandler(async (req, res) => {
    const count = await Project.countDocuments();
    res.status(200).json({ count });
});