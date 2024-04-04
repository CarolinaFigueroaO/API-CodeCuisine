const pool = require('../helpers/mysql-config'); //Importing the database configuration

const createSession = async (req, res) => {
    const player_name = req.body.player_name; //Getting the email from the request
    
    const today = new Date();
    const date_session = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    
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
    console.log(date_session);
}

const sessionsByDay = async (req, res) => {
    const sql = `SELECT DATE(date_session) as day, COUNT(*) as count 
    FROM session 
    GROUP BY day`;


    pool.query(sql, (err, results, fields) => {
    if (err) {
        res.json(err);
    }
        res.json(results);
    });
}

module.exports = {createSession, sessionsByDay}; //Exportamos las funciones