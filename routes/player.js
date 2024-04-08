const express = require('express');
const router = express.Router(); //Creating the router
const {doLoginPlayer, createPlayer, getPlayers, getTotalScore} = require('../controllers/player.controller'); //Calling the controller
const middleware = require('../middleware/jwt.middleware'); //Importing the middleware

router.post('/loginPlayer', doLoginPlayer) //Defining the route to do the login
router.post('/createPlayer',  createPlayer) //Defining the route to create a player
router.get('/getPlayers', middleware, getPlayers) //Defining the route to get the players
router.post('/getTotalScore', middleware, getTotalScore) //Defining the route to update the total score

module.exports = router; //Exporting the router