const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://0.0.0.0:27017/hotels';

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