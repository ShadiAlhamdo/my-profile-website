const mongoose = require('mongoose');
// Middleware to validate ObjectId
function validateObjectId(req, res, next) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    next();
}
module.exports = validateObjectId;