//Define the dependencies and the port to be used
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer'); //To handle file uploads
const port = process.env.PORT || 3001 //Port to be used
const playerLoginRouter = require('./routes/playerLogin');
const adminRouter = require('./routes/admin');
const sessionRouter = require('./routes/session');
const levelProgressRouter = require('./routes/levelProgress');
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); //To avoid CORS problems
app.use(bodyParser.json());
app.use(multer().array())
app.use(express.json()); //To parse JSON bodies


app.use('/', playerLoginRouter); //Defining the route to the login
app.use('/', adminRouter); //Defining the route to the admin
app.use('/', sessionRouter); //Defining the route to the session
app.use('/', levelProgressRouter); //Defining the route to the level progress
app.use('/', userRouter); //Defining the route to the user

app.listen(port, () => {
    console.log(`Server started ${port}`);
});

