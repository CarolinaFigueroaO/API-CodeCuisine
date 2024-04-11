const express = require('express');
const router = express.Router(); //Creating the router
const {validateUser} = require('../controllers/user.controller'); //Calling the controller

router.post('/validateUser', validateUser) //Defining the route to validate the user


module.exports = router; //Exporting the router