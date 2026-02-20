const router = require ('express').Router();
const { registerUserCtrl, loginUserCtrl, verifyUserAccountCtrl } = require('../controllers/authcontroller');

// Register User Route
// POST /api/auth/register
router.post('/register', registerUserCtrl);

// Login User Route
// POST /api/auth/login
router.post('/login', loginUserCtrl);

// Verify User Account Route
// GET /api/auth/:userId/verify/:token
router.get('/:userId/verify/:token', verifyUserAccountCtrl);

module.exports = router;