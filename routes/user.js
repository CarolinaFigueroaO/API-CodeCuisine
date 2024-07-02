const express = require('express');
const router = express.Router(); //Creating the router
const {validateUser, userAulify} = require('../controllers/user.controller'); //Calling the controller

router.post('/validateUser', validateUser) //Defining the route to validate the user
router.post('/userAulify', userAulify) //Defining the route to validate the user

module.exports = router; //Exporting the router