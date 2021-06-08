// Setup empty JS object to act as endpoint for all routes.
projectData = {};

// Require Express to run server and routes.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
const serverListening = () => {console.log(`Server is running on localhost:${port}`)};
const server = app.listen(port, serverListening);

// POST Route for getting user data.
app.post('/userInput', getUserInput);

function getUserInput(req) {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    userFeeling: req.body.userFeeling,
  }
}

// GET Route for updating UI.
app.get('/getUserData', sendUserData)

function sendUserData(req, res) {
  res.send(projectData);
}
