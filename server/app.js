require('dotenv').config();          
require('./config/db');

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const authRouter = require("./routes/auth.routes");
const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
const PORT = process.env.PORT || 5005;

// CORS config
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://front-cohort-tools-mini-project.onrender.com',
    'http://93.107.57.232'
  ]
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static('public'));
app.use("/auth", authRouter);  

// Docs route
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'docs.html'));
});

// Routes to database
const cohortRoutes = require('./routes/cohorts.routes');
const studentRoutes = require('./routes/students.routes');

app.use('/api/cohorts', isAuthenticated, cohortRoutes);
app.use('/api/students', isAuthenticated, studentRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});