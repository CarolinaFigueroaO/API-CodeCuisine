const express = require('express');
const router = express.Router(); //Creating the router
const {createSession, sessionsToday} = require('../controllers/session.controller'); //Calling the controller

router.post('/createSession', createSession) //Defining the route to create a session
router.post('/sessionsToday', sessionsToday) //Defining the route to get the sessions today

module.exports = router; //Exporting the router