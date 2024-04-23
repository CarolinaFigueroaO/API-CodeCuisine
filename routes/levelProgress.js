const express = require('express');
const router = express.Router(); //Creating the router
const {createLevelProgress, playersByLevel, levelsCountPlayer, getStats} = require('../controllers/levelProgress.controller'); //Calling the controller
const middleware = require('../middleware/jwt.middleware');

router.post('/createLevelProgress', middleware, createLevelProgress) //Defining the route to create a level progress
router.get('/playersByLevel', middleware, playersByLevel) //Defining the route to get the players by level
router.post('/levelsCountPlayer', middleware, levelsCountPlayer) //Defining the route to get the levels count by player
router.post('/getStats', middleware, getStats) //Defining the route to get the stats of a player
module.exports = router; //Exporting the router