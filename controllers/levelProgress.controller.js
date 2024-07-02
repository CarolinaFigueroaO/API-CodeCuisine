const e = require('express');
const pool = require('../helpers/mysql-config'); //Importing the database configuration

const createLevelProgress = async (req, res) => {
    const player_name = req.body.player_name; //Getting the email from the request
    const id_level = req.body.id_level;
    const score = req.body.score;
    const start_time = req.body.start_time;
    const finish_time = req.body.finish_time;
    const sql = `CALL createLevelProgress(?, ?, ?, ?, ?)`; //Query to get the player_id from the player_name
    pool.query(sql, [player_name, id_level, score, start_time, finish_time], (err, results, fields) => { //Executing the query
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        res.json(results);
    })
}

//Count the players that have completed each level
const playersByLevel = async (req, res) => {
    const sql = `SELECT id_level, COUNT(DISTINCT id_player) AS player_count 
                 FROM levelProgress 
                 GROUP BY id_level`;
    pool.query(sql, (err, results, fields) => {
        if (err) {
            res.json(err);
        }
        res.json(results);
    });
}

//Count the levels that every player has completed
const levelsCountPlayer = async (req, res) => {
    const player_name = req.body.player_name;
    const sql = `SELECT COUNT(DISTINCT id_level) AS level_count
                    FROM levelProgress
                    WHERE id_player = (SELECT id_player FROM playerData WHERE player_name = ?)`;
    pool.query(sql, [player_name], (err, results, fields) => {
        if (err) {
            res.json(err);
        }
        if(results[0]){
            result = {message: "Player found", level_count: results[0].level_count};
            res.json(result);
        }
        else{
            res.json({message: "Player not found", level_count: 0});
        }
    });
}
const getStats = async (req, res) => {
    const player_name = req.body.player_name; //Getting the player_name from the request
    const sql = `CALL getStats(?)`; 
    pool.query(sql, [player_name], (err, results, fields) => { 
        if (err) {
            res.json(err); r
        }
        res.json(results[0]); 
    });
};


module.exports = {createLevelProgress, playersByLevel, levelsCountPlayer, getStats}; //Exportamos las funciones