const { getAllUsersCtrl ,getUserProfileCtrl, updateUserProfileCtrl, profilePhotoUploadCtrl, deleteUserProfileCtrl, getAllUsersCountCtrl} = require('../controllers/usersController');
const { photoUpload } = require('../middlewares/photoUpload');
const validateObjectId = require('../middlewares/validateObjectId');
const {verifyTokenAndAdmin,verifyTokenAndAdminOrUser, verifyTokenAndOnlyUser, verifyToken} = require('../middlewares/verifytoken');

const router = require('express').Router();

// Get All Users
// /api/users
router.route('/').get(verifyTokenAndAdmin,getAllUsersCtrl);

// Get User Count
// /api/users/count
router.route('/count').get(verifyTokenAndAdmin,getAllUsersCountCtrl);

// Get User Profile
// /api/users/:id
router.route('/:id').get(validateObjectId,getUserProfileCtrl);

// Update User Profile
// /api/users/:id
router.route('/:id').put(validateObjectId,verifyTokenAndOnlyUser,updateUserProfileCtrl);



// Profile Photo Upload Route
// /api/users/profile-photo-upload
router.route('/profile-photo-upload').post(verifyToken,photoUpload.single('image'),profilePhotoUploadCtrl);

// Delete User Profile
// /api/users/:id
router.route('/:id').delete(validateObjectId,verifyTokenAndAdminOrUser,deleteUserProfileCtrl);




module.exports = router;