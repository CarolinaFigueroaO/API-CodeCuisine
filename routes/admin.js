const express = require('express');
const router = express.Router(); //Creating the router
const {doLoginAdmin, addAdmin} = require('../controllers/admin.controller'); //Calling the controller
const middleware = require('../middleware/jwt.middleware'); //Importing the middleware

router.post('/loginAdmin', doLoginAdmin) //Defining the route to do the login
router.post('/addAdmin', middleware, addAdmin) //Defining the route to add an admin

module.exports = router; //Exporting the router