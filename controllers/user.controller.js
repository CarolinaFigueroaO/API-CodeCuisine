const e = require('express');
const pool = require('../helpers/mysql-config'); //Importing the database configuration
const jwt = require('jsonwebtoken'); //Importamos la librería de jsonwebtoken


const userAulify = async (req, res) => {
    const userAulify = "https://www.aulify.mx/isAulifyClient";
    const user = req.body.user; //Getting the email from the request
    const key = process.env.AULIFYKEY;
    fetch(userAulify, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: user, key: key}),
    })
    .then(response => response.json())
    .then(data => {
        res.json(data);
    })

}

const validateUser = async (req, res) => {
    const email = req.body.email; //Getting the email from the request
    const player_name = req.body.player_name;
    const sql = `CALL validateUser(?, ?)`; //Creating the query
    let token = "";
    pool.query(sql, [email, player_name], (err, results, fields) => { 
        if (err) {
            res.json(err); 
        } 
        else {
            token = jwt.sign({user_name: email}, process.env.KEYPHRASE, {expiresIn: 7200}); //We create the token
            result = {token: token}; 
            res.json(result);
        }
    });
}


module.exports = {validateUser, userAulify}; //Exportamos las funciones