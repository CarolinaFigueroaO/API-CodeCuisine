const express = require('express');
const router = express.Router(); //Creating the router
const {createLevelProgress, playersByLevel, levelsCountPlayer} = require('../controllers/levelProgress.controller'); //Calling the controller

router.post('/createLevelProgress', createLevelProgress) //Defining the route to create a level progress
router.get('/playersByLevel', playersByLevel) //Defining the route to get the players by level
router.post('/levelsCountPlayer', levelsCountPlayer) //Defining the route to get the levels count by player

module.exports = router; //Exporting the router