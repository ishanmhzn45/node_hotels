const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

//Get the default connection
//Moongoose maintain a default connection object representing the MongoDB connection
const db = mongoose.connection;

// Define event listeners for database connectionn

db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', (err) => {
    console.log('Mongodb connection error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB Server');
});

//Export the database connection
module.exports = db;