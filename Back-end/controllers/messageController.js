const asynchandler = require('express-async-handler');
const {Message, validateMessage ,} = require('../models/Message');
const Joi = require('joi');

/**-----------------------------------------------
 * @desc   Send a new message
 * @route  POST /api/messages
 * @method  POST
 * @access  Public (Any logged in user)
 -------------------------------------------------*/
module.exports.sendMessageCtrl = asynchandler(async (req, res) => {
    // Validation
    
    const { error } = validateMessage(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Create new message
    // @Todo Send email notification to admin about new message
    const message = new Message({
        username: req.body.username,
        email: req.body.email,
        description: req.body.description,
    });

    await message.save();
    res.status(201).json({ message: "Message sent successfully", data: message });
});

/**-----------------------------------------------
 * @desc   Get all messages (Admin only)
 * @route  GET /api/messages
 * @method  GET
 * @access  Admin
 -------------------------------------------------*/
module.exports.getAllMessagesCtrl = asynchandler(async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    
    res.status(200).json({
        success: true,
        count: messages.length,
        data: messages,
    });
});

/**-----------------------------------------------
 * @desc   Delete a message (Admin only)
 * @route  DELETE /api/messages/:id
 * @method  DELETE
 * @access  Admin
 -------------------------------------------------*/
module.exports.deleteMessageCtrl = asynchandler(async (req, res) => {
    const message = await Message.findByIdAndDelete(req.params.id);
    
    if (!message) {
        return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
});

// GET /api/messages/count
module.exports.getMessagesCountCtrl = asynchandler(async (req, res) => {
  const count = await Message.countDocuments();
  res.status(200).json({ count });
});
