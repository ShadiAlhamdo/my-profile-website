const Joi = require('joi');
const mongoose = require ('mongoose');


// Project Schema 
const ProjectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:100,       
    },
    description: { type: String, required: true },
    techStack: {
    type: [String],
    required: true,
    validate: {
    
        validator: function (arr) {
            return arr.length > 0 && arr.every(item => typeof item === 'string' && item.trim() !== '');
    }, // مصفوفة للتقنيات مثل React, Node, PLC
        message: 'Tech stack must be a non-empty array of strings.',
    },
    },
    githubLink: String,
    liveDemo: String,
    image: {
        type: Object,
        default: {
            url:'https://www.techuz.com/blog/wp-content/uploads/2018/10/Web-application-vs-website-1280x720.jpg',
            public_id:null,
        }
    }, // رابط صورة المشروع
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
    ,
    createdAt: { 
      type: Date,
     default: Date.now 
    }
}, { timestamps: true });


// Export Project Model
const Project = mongoose.model('Project', ProjectSchema);

// validation Create new Project
function validateCreateProject(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(100).required(),
        description: Joi.string().trim().required(),
        techStack: Joi.array().items(Joi.string().trim()),
        githubLink: Joi.string().uri().trim().optional().allow(''),
        liveDemo: Joi.string().uri().trim().optional().allow(''),
        image: Joi.object().optional(),
        category: Joi.string().required(),
    });

    return schema.validate(obj);
}

// validation Update Project
function validateUpdateProject(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(100).optional(),
        description: Joi.string().trim().optional(),
        techStack: Joi.array().items(Joi.string().trim()).optional(),
        githubLink: Joi.string().uri().trim().optional().allow(''),
        liveDemo: Joi.string().uri().trim().optional().allow(''),
        image: Joi.object().optional(),
        category: Joi.string(),
    });

    return schema.validate(obj);
}

module.exports = {
    Project,
    validateCreateProject,
    validateUpdateProject
}