const express = require('express');
const router = express.Router(); //Creating the router
const {doLoginAdmin} = require('../controllers/admin.controller'); //Calling the controller
const middleware = require('../middleware/jwt.middleware'); //Importing the middleware

router.post('/loginAdmin', doLoginAdmin) //Defining the route to do the login

module.exports = router; //Exporting the router