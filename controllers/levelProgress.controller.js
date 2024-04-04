const pool = require('../helpers/mysql-config'); //Importing the database configuration

const createLevelProgress = async (req, res) => {
    const player_name = req.body.player_name; //Getting the email from the request
    const id_level = req.body.id_level;
    const score = req.body.score;

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    
    const getPlayerId = `SELECT id_player FROM playerData WHERE player_name = ?`;
    

    pool.query(getPlayerId, [player_name], (err, results, fields) => { //The callback function is executed when the query is done
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        const id_player = results[0].id_player;
        const sql = `INSERT INTO levelProgress (id_player, id_level, score, date_level) VALUES (?, ?, ?, ?)`;
        pool.query(sql, [id_player, id_level, score, date], (err, results, fields) => { //The callback function is executed when the query is done
            if (err) {
                res.json(err); //If there is an error, we send the error
            }
            res.json(results); //We send the result
        })
    })
}

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

const levelsCountPlayer = async (req, res) => {
    const player_name = req.body.player_name;
    const sql = `SELECT COUNT(DISTINCT id_level) AS level_count
                    FROM levelProgress
                    WHERE id_player = (SELECT id_player FROM playerData WHERE player_name = ?)`;
    pool.query(sql, [player_name], (err, results, fields) => {
        if (err) {
            res.json(err);
        }
        res.json(results);
    });
}

module.exports = {createLevelProgress, playersByLevel, levelsCountPlayer}; //Exportamos las funciones