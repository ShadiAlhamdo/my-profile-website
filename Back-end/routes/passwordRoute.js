const router = require('express').Router();
const { sendResetPasswordLinkCtrl, getResetPasswordLinkCtrl, resetPasswordCtrl } = require('../controllers/passwordController');

// Send Reset Password Link
// POST /api/password/reset-password-link
router.post('/reset-password-link', sendResetPasswordLinkCtrl);

// Get Reset Password Link
// GET /api/password/reset-password/:userId/:token
router.get('/reset-password/:userId/:token', getResetPasswordLinkCtrl);

// Reset Password
// POST /api/password/reset-password/:userId/:token
router.post('/reset-password/:userId/:token', resetPasswordCtrl);

module.exports = router;