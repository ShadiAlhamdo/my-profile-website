const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');
// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    profilephoto: {
        type: Object,
        default: {
            url: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',  
            publicId: null,
        }
    },
    bio: {
        type: String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isAccountVerified:{
        type:Boolean,
        default:false,
    }
}, { timestamps: true });

// Generate Auth Token Method 
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
}

// Export User Model  
const User = mongoose.model('User', UserSchema);

// Validate Regster User
function validateRegisterUser(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: passwordComplexity().required(),
    });
    return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(obj);
}

// Validate Email for Password Reset
function validateEmail(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
    });
    return schema.validate(obj);
}

// Validate New  Password 
function validateNewPassword(obj){
    const schema = Joi.object({
        password: passwordComplexity().required(),
    });
    return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(100),
        password: Joi.string().min(8),
        bio: Joi.string(),
    });
    return schema.validate(obj);
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateEmail,
    validateNewPassword,
};