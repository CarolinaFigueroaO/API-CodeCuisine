const pool = require('../helpers/mysql-config'); //Importing the database configuration
const jwt = require('jsonwebtoken'); //Importamos la librería de jsonwebtoken

const createPlayer = async (req, res) => {
    const player_name = req.body.player_name; //Getting the email from the request
    const id_user = null;
    const verifyPlayer = `SELECT COUNT(*) as count FROM playerData WHERE player_name = ?`;
    pool.query(verifyPlayer, [player_name], (err, results, fields) => { //The callback function is executed when the query is done
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        if(results[0].count === 0){ //If the user does not exist
            const sql = `INSERT INTO playerData (player_name, id_user) VALUES (?, ?)`; //Creating the query
            pool.query(sql, [player_name, id_user], (err, results, fields) => { //The callback function is executed when the query is done
                if (err) {
                    res.json(err); //If there is an error, we send the error
                }
                res.json({message: "Player created"}); //We send the result
            });
        }
        else{ //If the user exists
            res.json({message: "Player already exists"}); //We send the result
        }
    });
}

const doLoginPlayer = async (req, res) => {
    const player_name = req.body.player_name; //Getting the email from the request
    //Verifying the user and password
    let token = "";
    const sql = `SELECT COUNT(*) as count FROM playerData WHERE player_name = ?`;
    pool.query(sql, [player_name], (err, results, fields) => { //The callback function is executed when the query is done
        
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        if(results[0].count === 1){ //If the user and password are correct
            token = jwt.sign({player_name: player_name}, process.env.KEYPHRASE, {expiresIn: 7200}); //We create the token
            result = {token: token}; //We create the response
        }
        else{ //If the user and password are incorrect
            result = {token: token}; //We create the response
        }

        res.json(result); //We send the result
    })

};

//Function to get the accumulated score of a player
const getTotalScore = async (req, res) => {
    const player_name = req.body.player_name; //Getting the player_name from the request
    console.log(req);   
    const sql = `SELECT SUM(score) as total_score FROM levelProgress WHERE id_player = (SELECT id_player FROM playerData WHERE player_name = ?)`;
    pool.query(sql, [player_name], (err, results, fields) => { //The callback function is executed when the query is done
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        res.json(results); //We send the result
    })
}


const getPlayers = async (req, res) => {
    const sql = `SELECT player_name FROM playerData`;
    pool.query(sql, (err, results, fields) => {
        if (err) {
            res.json(err);
        }
        res.json(results);
    });
}


module.exports = {doLoginPlayer, createPlayer, getPlayers, getTotalScore}; //Exportamos las funciones
