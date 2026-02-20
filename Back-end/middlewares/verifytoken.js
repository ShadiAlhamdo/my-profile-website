const jwt = require('jsonwebtoken');

// Verify Token
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    if(authToken)
    {
        const token = authToken.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid Token , access denied' });
        }
    }
    else {

        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

}
// Verify Token And Admin
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    })
}

// Verify Token Only User Him Self
function verifyTokenAndOnlyUser(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. You can only update your own profile.' });
        }
    })
}

// Virefy Token And Admin Or User Himself
function verifyTokenAndAdminOrUser(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin || req.user.id === req.params.id) 
        {
            next();
            } 
            else
                {
                    res.status(403).json({ message: 'Access denied. You can only update your own profile or you must be an admin.' });
                }
    });
}

module.exports = { 
    verifyToken,
     verifyTokenAndAdmin,
     verifyTokenAndOnlyUser,
     verifyTokenAndAdminOrUser
};