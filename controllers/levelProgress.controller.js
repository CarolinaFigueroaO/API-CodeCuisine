const e = require('express');
const pool = require('../helpers/mysql-config'); //Importing the database configuration

const createLevelProgress = async (req, res) => {
    const player_name = req.body.player_name; //Getting the email from the request
    const id_level = req.body.id_level;
    const score = req.body.score;
    const start_time = req.body.start_time;
    const finish_time = req.body.finish_time;

    const getPlayerId = `SELECT id_player FROM playerData WHERE player_name = ?`;
    

    pool.query(getPlayerId, [player_name], (err, results, fields) => { //The callback function is executed when the query is done
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        if(results.length === 1){
            console.log("posteado");
            const id_player = results[0].id_player;
            const sql = `INSERT INTO levelProgress (id_player, id_level, score, start_time, finish_time) VALUES (?, ?, ?, ?, ?)`;
            pool.query(sql, [id_player, id_level, score, start_time, finish_time], (err, results, fields) => {
                if (err) {
                    res.json(err);
                }
                res.json(results);
            });
        } else {
            res.json({message: "Player not found"});
        }
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
        res.json(results);
    });
}
const getStats = async (req, res) => {
    const player_name = req.body.player_name; // Obtener el nombre del jugador desde la solicitud
    const sql = `
        SELECT 
            (SELECT SUM(finish_time - start_time) as time_played FROM levelProgress WHERE id_player = (SELECT id_player FROM playerData WHERE player_name = ?)) as time_played,
            (SELECT COUNT(*) as total_levels FROM levelProgress WHERE id_player = (SELECT id_player FROM playerData WHERE player_name = ?)) as total_levels,
            (SELECT COUNT(DISTINCT id_level) AS level_count FROM levelProgress WHERE id_player = (SELECT id_player FROM playerData WHERE player_name = ?)) as level_count,
            (SELECT SUM(score) as total_score FROM levelProgress WHERE id_player = (SELECT id_player FROM playerData WHERE player_name = ?)) as total_score,
            (SELECT COUNT(*) + 1 as player_rank FROM (
                SELECT pd.player_name, SUM(lp.score) as total_score 
                FROM levelProgress lp
                INNER JOIN playerData pd ON lp.id_player = pd.id_player
                GROUP BY lp.id_player, pd.player_name
                HAVING total_score > (
                    SELECT SUM(lp2.score) as total_score
                    FROM levelProgress lp2
                    INNER JOIN playerData pd2 ON lp2.id_player = pd2.id_player
                    WHERE pd2.player_name = ?
                    GROUP BY pd2.player_name
                )
            ) as ranks) as player_rank`;
    pool.query(sql, [player_name, player_name, player_name, player_name, player_name], (err, results, fields) => { 
        // La función de devolución de llamada se ejecuta cuando se completa la consulta
        if (err) {
            res.json(err); // Si hay un error, enviamos el error
        }

        result = {
            time_played: (results[0].time_played/3600).toFixed(2),
            total_levels: results[0].total_levels,
            level_count: results[0].level_count,
            total_score: results[0].total_score,
            player_rank: results[0].player_rank
        };
        res.json(result); // Enviamos el resultado
    });
};


module.exports = {createLevelProgress, playersByLevel, levelsCountPlayer, getStats}; //Exportamos las funciones