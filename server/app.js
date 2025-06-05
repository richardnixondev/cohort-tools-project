const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5005;
const cors = require('cors');

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
//const DATA_STUDENTS = path.join(__dirname, 'students.json');
//const DATA_COHORTS = path.join(__dirname, 'cohorts.json');

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5173', 'https://front-cohort-tools-mini-project.onrender.com', '93.107.57.232'],
  })
);


app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});





// Cohort routes
app.get("/api/cohorts", (req, res) => {
  res.sendFile(__dirname + "/cohorts.json");
});


// Student routes

app.get("/api/students", (req, res) => {
  res.sendFile(__dirname + "/students.json");
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});