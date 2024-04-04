const express = require('express');
const router = express.Router(); //Creating the router
const {createSession, sessionsByDay} = require('../controllers/session.controller'); //Calling the controller

router.post('/createSession', createSession) //Defining the route to create a session
router.get('/sessionsByDay', sessionsByDay) //Defining the route to get the sessions today

module.exports = router; //Exporting the router