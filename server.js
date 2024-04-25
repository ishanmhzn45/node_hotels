const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('Welcome To Our Hotel')
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//  Use the routers 
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(3000, () =>
  console.log("Server is running on port 3000")
) 