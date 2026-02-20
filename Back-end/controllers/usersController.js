const asynchandler = require('express-async-handler');
const { User, validateUpdateUser } = require('../models/User');
const bycrypt = require('bcrypt');
const { handleImageUpload, cloudinaryRemoveImage } = require('../utils/cloudinary');


/**-----------------------------------------------
 * @desc   Get all Users Profile
 * @route  GET /api/users 
 * @method  GET
 * @access  Private (Admin)
 -------------------------------------------------*/
 module.exports.getAllUsersCtrl = asynchandler(async (req, res) => {
        const users =  await User.find().sort({ createdAt: -1 }).select('-password');
    res.status(200).json(users);
});

/**-----------------------------------------------
 * @desc   Get  Users Count
 * @route  GET /api/users/count
 * @method  GET
 * @access  Private (Admin)
 -------------------------------------------------*/
 module.exports.getAllUsersCountCtrl = asynchandler(async (req, res) => {
        const count =  await User.countDocuments();
    res.status(200).json({count});
});


/**-----------------------------------------------
 * @desc   Get  Users Profile
 * @route  GET /api/users/:id 
 * @method  GET
 * @access  Public 
 -------------------------------------------------*/
module.exports.getUserProfileCtrl = asynchandler(async (req, res) => {
    const user = await User.findById
    (req.params.id).select('-password');
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json(user);
});

/**-----------------------------------------------
 * @desc   Update  User Profile
 * @route    /api/users/:id 
 * @method  PUT
 * @access  Private (Only User Him Self)
 -------------------------------------------------*/
 module.exports.updateUserProfileCtrl = asynchandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    if(req.body.password)
    {
        const salt = await bycrypt.genSalt(10);
        req.body.password = await bycrypt.hash(req.body.password, salt);
    }
    const UpdatedPassword = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio,

        }
    }, { new: true }).select('-password');

    res.status(200).json(UpdatedPassword);
});

/**-----------------------------------------------
 * @desc   Update Profile Photo  Upload
 * @route   /api/users/profile-photo-upload
 * @method  POST
 * @access  Private (Only User Him Self)
 -------------------------------------------------*/
 module.exports.profilePhotoUploadCtrl = asynchandler(async (req, res) => {
     // 1- Validation
    if (!req.file) {
        return res.status(400).json({ message: "No File Provided" });
    }

    // 2- Get The Buffer of the Image
    const fileBuffer = req.file.buffer;

    // 3- Upload to Cloudinary
    try {
        const imageInfo = await handleImageUpload(fileBuffer);
    //4- Get The User From DB
    const user=await User.findById(req.user.id);

    //5- Delete The Old Profile Photo If Exist
    if(user.profilephoto.publicId !== null)
    {
        await cloudinaryRemoveImage(user.profilephoto.publicId);
    }
    //6- Change the ProfilePhoto Field In The DB
    user.profilephoto = {
        url:imageInfo.secure_url,
        publicId:imageInfo.public_id,
    };

    await user.save();

    // 7- Send the response to the client
        res.status(200).json({
            message: "Your Profile Photo Uploaded Successfully",
            profilephoto:{url:imageInfo.secure_url, publicId:imageInfo.public_id}
        });
    } catch (error) {
        console.error("Error in profilePhotoUploadCtrl:", error);
        res.status(500).json({ message: "Error uploading image" });
    }
});

/**-----------------------------------------------
 * @desc   Delete User Profile
 * @route   /api/users/:id
 * @method  DELETE
 * @access  Private (Only User Him Self Or Admin)
 -------------------------------------------------*/
module.exports.deleteUserProfileCtrl = asynchandler(async (req, res) => {
    //1-Get The User From The DB
    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message:"The User Not Found"});
    }
    //@TODO -2 Get All Projects Form DB
    //@TODO -3 Get The Public Ids From The Posts
    //@TODO -4 Delete All Posts Image From Cloudinary That Belong This User
    
    //-5. Delete The Profile Photo From Cloudinary
    if(user.profilephoto.publicId !== null){
         await cloudinaryRemoveImage(user.profilephoto.publicId);
    }
    //@TODO -6 Delete User Posts & Comment
    
    //-7 Delete User HimSelf
    await User.findOneAndDelete(req.params.id);


    //-8 Send Response To Client
    res.status(200).json({message:"Your Profile Has Been Deleted"});
});