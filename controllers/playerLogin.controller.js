const pool = require('../helpers/mysql-config'); //Importing the database configuration

const createPlayer = async (req, res) => {
    const player_name = req.body.player_name; //Getting the email from the request
    const id_user = null;
    const sql = `INSERT INTO playerData (id_user, player_name) VALUES (?, ?)`;
    pool.query(sql, [id_user, player_name], (err, results, fields) => { //The callback function is executed when the query is done
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        res.json(results); //We send the result
    })
}

const doLoginPlayer = async (req, res) => {
    const player_name = req.body.player_name; //Getting the email from the request
    //Verifying the user and password
    const sql = `SELECT COUNT(*) as count FROM playerData WHERE player_name = ?`;
    pool.query(sql, [player_name], (err, results, fields) => { //The callback function is executed when the query is done
        
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        if(results[0].count === 1){ //If the user and password are correct
            console.log("Bienvenido");
        }
        else{ //If the user and password are incorrect
            console.log("Usuario incorrecto");
        }

        res.json(results[0].count); //We send the result
    })

};

const incrementTimePlayed = async (req, res) => {
    const player_name = req.body.player_name; //Getting the email from the request
    const time_played = req.body.time_played; //Getting the password from the request
    const sql = `UPDATE playerData SET time_played = time_played + ? WHERE player_name = ?`;
    pool.query(sql, [time_played, player_name], (err, results, fields) => { //The callback function is executed when the query is done
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


module.exports = {doLoginPlayer, createPlayer, incrementTimePlayed, getPlayers}; //Exportamos las funciones
