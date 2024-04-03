const pool = require('../helpers/mysql-config'); //Importing the database configuration

const createSession = async (req, res) => {
    const player_name = req.body.player_name; //Getting the email from the request
    const date_session = req.body.date_session;
    const getPlayerId = `SELECT id_player FROM playerData WHERE player_name = ?`;
    pool.query(getPlayerId, [player_name], (err, results, fields) => { //The callback function is executed when the query is done
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        const id_player = results[0].id_player;
        const sql = `INSERT INTO session (id_player, date_session) VALUES (?, ?)`;
        pool.query(sql, [id_player, date_session], (err, results, fields) => { //The callback function is executed when the query is done
            if (err) {
                res.json(err); //If there is an error, we send the error
            }
            res.json(results); //We send the result
        })
    })
}

const sessionsToday = async (req, res) => {
    const date_session = req.body.date_session;
    const sql = `SELECT COUNT(*) as count FROM session WHERE date_session = ?`;
    pool.query(sql, [date_session], (err, results, fields) => { //The callback function is executed when the query is done
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        res.json(results[0].count); //We send the result
    })

}

module.exports = {createSession, sessionsToday}; //Exportamos las funciones