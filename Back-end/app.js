const express = require('express');
const connectToDb = require('./Config/connectToDb');
const { errorHandler, notFound } = require('./middlewares/error');
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
require('dotenv').config();

// Connection To Db
connectToDb();

// Init App
const app = express();

// Middleware
app.use(express.json());

// Set security HTTP headers
app.use(helmet());

// Prevent Http Parameter Pollution
app.use(hpp());


// Rate Limiting Middleware
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
}));
// Support URL-encoded form bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Cors Policy
app.use(cors({
    origin: process.env.FRONTEND_URL,
}))

// Routes Middleware
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/projects', require('./routes/projectsRoute'));
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/messages', require('./routes/messagesRoute'));
app.use('/api/cv', require('./routes/cvRoute'));
app.use('/api/categories', require('./routes/categoriesRoute'));
app.use('/api/password', require('./routes/passwordRoute'));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);
// Running The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is Running On Port ${PORT}`);
});