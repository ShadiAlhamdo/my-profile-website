const mongoose = require('mongoose');
const Joi = require('joi');

// Message Schema
const MessageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Validation For Message
function validateMessage(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(3).required(),
        email: Joi.string().trim().email().required(),
        description: Joi.string().trim().min(5).required(),
    });
    return schema.validate(obj);
}

// Export Message Model
const Message = mongoose.model('Message', MessageSchema);

module.exports = {
    Message,
    validateMessage,
};
