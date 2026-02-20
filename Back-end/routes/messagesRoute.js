const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAndAdmin } = require('../middlewares/verifytoken');
const {
    sendMessageCtrl,
    getAllMessagesCtrl,
    deleteMessageCtrl,
    getMessagesCountCtrl,
} = require('../controllers/messageController');

/**
 * @route   POST /api/messages
 * @desc    Send a new message
 * @access  Public (Any user)
 */
router.post('/', sendMessageCtrl);

/**
 * @route   GET /api/messages
 * @desc    Get all messages (sorted from newest to oldest)
 * @access  Admin only
 */
router.get('/', verifyTokenAndAdmin, getAllMessagesCtrl);

/**
 * @route   DELETE /api/messages/:id
 * @desc    Delete a message
 * @access  Admin only
 */
router.delete('/:id', verifyTokenAndAdmin, deleteMessageCtrl);
//  /api/messages/count
router.get('/count', verifyTokenAndAdmin, getMessagesCountCtrl);
module.exports = router;
