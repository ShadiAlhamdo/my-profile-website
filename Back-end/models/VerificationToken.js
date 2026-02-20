const mongoose = require('mongoose');


// VerificationToken Schema
const VerificationTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// VerificationToken Model
const VerificationToken = mongoose.model('VerificationToken', VerificationTokenSchema);



module.exports = {
    VerificationToken,
};
