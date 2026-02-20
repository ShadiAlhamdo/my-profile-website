const asynchandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { User, validateRegisterUser, validateLoginUser } = require('../models/User');
const { VerificationToken } = require('../models/VerificationToken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

/**-----------------------------------------------
 * @desc   Register new user
 * @route  POST /api/users/register 
 * @method  POST
 * @access  Public
 -------------------------------------------------*/
module.exports.registerUserCtrl = asynchandler(async (req, res) => {
     // Validation (handle undefined body safely)
    const { error } = validateRegisterUser(req.body || {});
    if (error){
        return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if(user){
        return res.status(400).json({message: 'User already registered.'})
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Create user
     user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
     await user.save();
    //Created New Verfication Token and save it in the database
    const verificationToken = new VerificationToken({
        user: user._id,
        token:crypto.randomBytes(32).toString('hex'),
    });
    await verificationToken.save();

    // Making The Link
    const link = `${process.env.FRONTEND_URL}/users/${user._id}/verify/${verificationToken.token}`;
    //Putting the Link In Html Template and Sending Email
    const htmlTemplate = `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <style>
        :root{--bg:#f6f8fa;--card:#ffffff;--accent:#007bff;--muted:#6b7280;--text:#111827}
        body{margin:0;padding:20px;font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--text)}
        .container{max-width:600px;margin:24px auto;background:var(--card);border-radius:12px;box-shadow:0 6px 18px rgba(15,23,42,0.08);overflow:hidden}
        .header{padding:20px;border-bottom:1px solid rgba(0,0,0,0.04);display:flex;align-items:center;gap:12px}
        .logo{width:48px;height:48px;background:linear-gradient(135deg,var(--accent),#6f9cff);border-radius:10px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:18px}
        .title{margin:0;font-size:18px}
        .content{padding:20px}
        p{margin:0 0 18px;line-height:1.5;color:var(--muted)}
        .cta{display:inline-block;padding:12px 18px;background:var(--accent);color:#fff;border-radius:8px;text-decoration:none;font-weight:600}
        .footer{padding:16px 20px;font-size:13px;color:var(--muted);border-top:1px solid rgba(0,0,0,0.03)}
        @media (max-width:480px){
          .container{margin:12px;border-radius:10px}
          .header{padding:16px}
          .content{padding:16px}
          .cta{width:100%;text-align:center;display:block}
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">V</div>
          <h1 class="title">Verify Your Account</h1>
        </div>
        <div class="content">
          <p>Click the link below to verify your account:</p>
          <a class="cta" href="${link}">Verify Account</a>
        </div>
        <div class="footer">
          If you didn't create an account, you can safely ignore this email.
        </div>
      </div>
    </body>
    </html>
    `;
    //Sending Email
    await sendEmail(user.email, 'Verify Your Account', htmlTemplate);

    
    // Response to the client
    res.status(201).json({ message: "We Sent to your email address to verify your account." });
});

/**-----------------------------------------------
 * @desc   Login  user
 * @route  POST /api/users/login 
 * @method  POST
 * @access  Public
 -------------------------------------------------*/
 module.exports.loginUserCtrl = asynchandler(async (req, res) => {
    // Validation (handle undefined body safely)
    const {error} = validateLoginUser(req.body || {});
    if (error){
        return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.status(400).json({message: 'Invalid email or password.'})
    }
    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(400).json({message: 'Invalid email or password.'})
    }
    //Sending Email if account is not verified
    if(!user.isAccountVerified){
      let verificationToken = await VerificationToken.findOne({ user: user._id });
      if(!verificationToken){
        verificationToken = new VerificationToken({
            user: user._id,
            token:crypto.randomBytes(32).toString('hex'),
        });
        await verificationToken.save();
      }
      // Making The Link
      const link = `${process.env.FRONTEND_URL}/users/${user._id}/verify/${verificationToken.token}`;
      //Putting the Link In Html Template and Sending Email
      const htmlTemplate = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style>
          :root{--bg:#f6f8fa;--card:#ffffff;--accent:#007bff;--muted:#6b7280;--text:#111827}
          body{margin:0;padding:20px;font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--text)}
          .container{max-width:600px;margin:24px auto;background:var(--card);border-radius:12px;box-shadow:0 6px 18px rgba(15,23,42,0.08);overflow:hidden}
          .header{padding:20px;border-bottom:1px solid rgba(0,0,0,0.04);display:flex;align-items:center;gap:12px}
          .logo{width:48px;height:48px;background:linear-gradient(135deg,var(--accent),#6f9cff);border-radius:10px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:18px}
          .title{margin:0;font-size:18px}
          .content{padding:20px}
          p{margin:0 0 18px;line-height:1.5;color:var(--muted)}
          .cta{display:inline-block;padding:12px 18px;background:var(--accent);color:#fff;border-radius:8px;text-decoration:none;font-weight:600}
          .footer{padding:16px 20px;font-size:13px;color:var(--muted);border-top:1px solid rgba(0,0,0,0.03)}
          @media (max-width:480px){          
            .container{margin:12px;border-radius:10px}
            .header{padding:16px}
            .content{padding:16px}
            .cta{width:100%;text-align:center;display:block}
    }      </style>          
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">V</div>
            <h1 class="title">Verify Your Account</h1>
          </div>
          <div class="content">
            <p>Click the link below to verify your account:</p>
            <a class="cta" href="${link}">Verify Account</a>
          </div>
          <div class="footer">
            If you didn't create an account, you can safely ignore this email.
          </div>
        </div>
      </body>
      </html>
      `;

       await sendEmail(user.email, 'Verify Your Account', htmlTemplate);
        return res.status(400).json({message:"We Have Send An Email To Verify Your Account, Please Check Your Email."});

    }

    //Generatte Token 
    const token = user.generateAuthToken();
    // Successful login
    res.status(200).json({
        _id: user._id,
        username:user.username,
        isAdmin: user.isAdmin,
        profilephoto: user.profilephoto,
        token: token,
    });
});

/**-----------------------------------------------
 * @desc   Verify user account
 * @route  GET /api/auth/userId/verify/:token 
 * @method  GET
 * @access  Public
 -------------------------------------------------*/
 module.exports.verifyUserAccountCtrl= asynchandler(async (req, res) => {
    const { userId, token } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).json({ message: "Invalid Link." });
    }
    const verificationToken = await VerificationToken.findOne({ user: userId, token: token });
    if (!verificationToken) {
        return res.status(400).json({ message: "Invalid Link." });
    }
    user.isAccountVerified = true;
    await user.save();
    await VerificationToken.findByIdAndDelete(verificationToken._id);
    res.status(200).json({ message: "Account verified successfully." });
});

