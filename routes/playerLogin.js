const express = require('express');
const router = express.Router(); //Creating the router
const {doLoginPlayer, createPlayer, incrementTimePlayed} = require('../controllers/playerLogin.controller'); //Calling the controller
const middleware = require('../middleware/jwt.middleware'); //Importing the middleware

router.post('/loginPlayer', doLoginPlayer) //Defining the route to do the login
router.post('/createPlayer', createPlayer) //Defining the route to create a player
router.post('/incrementTimePlayed', incrementTimePlayed) //Defining the route to increment the time played

module.exports = router; //Exporting the router