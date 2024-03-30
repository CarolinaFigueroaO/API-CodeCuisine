//Define the dependencies and the port to be used
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer'); //To handle file uploads
const port = process.env.PORT || 3001 //Port to be used
const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin');

const app = express();
app.use(cors()); //To avoid CORS problems
app.use(multer().array())
app.use(express.json()); //To parse JSON bodies


app.use('/', loginRouter); //Defining the route to the login
app.use('/', adminRouter); //Defining the route to the admin

app.listen(port, () => {
    console.log(`Server started ${port}`);
});

