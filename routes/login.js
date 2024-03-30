const express = require('express');
const router = express.Router(); //Creating the router
const {doLogin} = require('../controllers/login.controller'); //Calling the controller
const middleware = require('../middleware/jwt.middleware'); //Importing the middleware

router.post('/login', doLogin) //Defining the route to do the login

module.exports = router; //Exporting the router