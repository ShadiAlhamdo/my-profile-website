const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CLOUD_URI);
        console.log('Connected to MongoDB ^_^');
    } catch (error) {
        console.error('Connection Failed To MongoDb', error);
    }
};