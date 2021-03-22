//Express to run server
const express = require("express");

//setting up an instance for app
const app = express();

//Adding dependancies
const bodyParser = require("body-parser");

//configuration for express to use body-parser as middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Cors
const cors = require("cors");
app.use(cors());

//initializing project folder
app.use(express.static("Website"));

//Local server
const port = 8000;
const server = app.listen(port, () => {
    console.log("server running",
                `running on local host: ${port}`);
});

//endpoint for all routes
projectData = {};

//GET route
app.get("/all", getProjectData);

function getProjectData(request,response) {
    response.send(weatherData);
    console.log(weatherData);
}

const weatherData = [];
// POST route
app.post("/addData", addProjectData);

function addProjectData(request, response) {
    newEntry = {
        date: request.body.date,
        temp: request.body.temp,
        feelings: request.body.feelings
    }

    weatherData.push(newEntry);
    response.send(weatherData);
}
