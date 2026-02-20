const asynchandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { User,validateEmail,validateNewPassword } = require('../models/User');
const { VerificationToken } = require('../models/VerificationToken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

/**-----------------------------------------------
 * @desc   Sent Reset Password Link
 * @route  POST /api/password/reset-password-link 
 * @method  POST
 * @access  Public
 -------------------------------------------------*/
 module.exports.sendResetPasswordLinkCtrl = asynchandler(async (req, res) => { 
    const {error} = validateEmail(req.body);
    // Validate email
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Generate a unique token
    let verificationToken = await VerificationToken.findOne({ user: user._id });
    if (verificationToken) {
        await VerificationToken.deleteOne({ user: user._id });
    }
     verificationToken = crypto.randomBytes(32).toString('hex');
    // Save the token to the database
    await VerificationToken.create({ user: user._id, token: verificationToken });
    // Send the reset password link via email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${verificationToken}`;
    await sendEmail(user.email, 'Password Reset Request', `Click the link to reset your password:<a href="${resetLink}">Clik Here To Reset Password</a>`);
    res.status(200).json({ message: 'Reset password link sent to your email,check your email inbox.' });
});
/**-----------------------------------------------
 * @desc   GEt Reset Password Link
 * @route  GET /api/password/reset-password/:userId/:token 
 * @method  GET
 * @access  Public
 -------------------------------------------------*/
module.exports.getResetPasswordLinkCtrl = asynchandler(async (req, res) => {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'Invalid link' });
        }
        const verificationToken = await VerificationToken.findOne({ user: user._id, token: req.params.token });
        if (!verificationToken) {
            return res.status(404).json({ message: 'Invalid link' });
        }
        res.status(200).json({ message: 'Valid link' });

});
/**-----------------------------------------------
 * @desc    Reset Password 
 * @route  POST /api/password/reset-password/:userId/:token 
 * @method  POST
 * @access  Public
 -------------------------------------------------*/
module.exports.resetPasswordCtrl = asynchandler(async (req, res) => {
    const {error} = validateNewPassword(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const user = await
        User.findById(req.params.userId);
    if (!user) {
        return res.status(404).json({ message: 'Invalid link' });
    }
    const verificationToken = await VerificationToken.findOne({ user: user._id, token: req.params.token });
    if (!verificationToken) {
        return res.status(404).json({ message: 'Invalid link' });
    }
    if(!user.isAccountVerified){
        user.isAccountVerified = true;
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.save();
    await VerificationToken.deleteOne({ userId: user._id });
    res.status(200).json({ message: 'Password reset successful' });
});