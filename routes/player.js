const express = require('express');
const router = express.Router(); //Creating the router
const {doLoginPlayer, createPlayer, getPlayers, getTotalScore, getLeaderboard, timePlayedAll, countPlayers, countUsers} = require('../controllers/player.controller'); //Calling the controller
const middleware = require('../middleware/jwt.middleware'); //Importing the middleware

router.post('/loginPlayer', doLoginPlayer) //Defining the route to do the login
router.post('/createPlayer',  createPlayer) //Defining the route to create a player
router.get('/getPlayers', middleware, getPlayers) //Defining the route to get the players
router.post('/getTotalScore', middleware, getTotalScore) //Defining the route to update the total score
router.get('/getLeaderboard', middleware, getLeaderboard) //Defining the route to get the total score of all players
router.get('/timePlayedAll', middleware, timePlayedAll) //Defining the route to get the total time played by all players
router.get('/countPlayers', middleware, countPlayers) //Defining the route to get the total number of players
router.get('/countUsers', middleware, countUsers) //Defining the route to get the total number of players and users

module.exports = router; //Exporting the router