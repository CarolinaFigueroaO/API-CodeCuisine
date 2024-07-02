const pool = require('../helpers/mysql-config'); //Importing the database configuration
const jwt = require('jsonwebtoken'); //Importamos la librería de jsonwebtoken

const createPlayer = async (req, res) => {
    const player_name = req.body.player_name; //Getting the email from the request
    let token = "";
    const verifyPlayer = `CALL createPlayer(?)`; //Query to get the player_id from the player_name
    pool.query(verifyPlayer, [player_name], (err, results, fields) => { //The callback function is executed when the query is done
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        if(results[0][0].message == "Player created"){ //If the user and password are correct
            token = jwt.sign({player_name: player_name}, process.env.KEYPHRASE, {expiresIn: 7200}); //We create the token
        }
        result = {token: token}; //We create the response
        res.json(result); //We send the result
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
        if(results[0] && results[0].count === 1){ //If the user and password are correct
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


const getLeaderboard = async (req, res) => {
    const sql = `SELECT pd.id_player, pd.player_name, pd.id_user, SUM(lp.score) as total_score 
                 FROM levelProgress lp
                 INNER JOIN playerData pd ON lp.id_player = pd.id_player
                 GROUP BY lp.id_player, pd.player_name
                 ORDER BY total_score DESC`;

    pool.query(sql, (err, results, fields) => {
        if (err) {
            res.json(err);
            return;
        }

        // Iterate over the results and create a new array with the data we want to return
        const leaderboard = results.map(row => {
            const { id_user, ...rest } = row; // Remove the id_user from the row
            const isUser = row.id_user !== null;
            return { ...rest, isUser };
        });

        res.json(leaderboard);
    });
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

const timePlayedAll = async (req, res) => {
    const sql = `SELECT DATE(start_time) as day, SUM(finish_time - start_time) as time_played FROM levelProgress GROUP BY day`;
    pool.query(sql, (err, results, fields) => {
        if (err) {
            throw err;
        }
        const timePlayedPerDay = {};
        results.forEach(row => {
            const day = new Date(row.day).toLocaleDateString('es-ES'); // Formato de día personalizado
            const timePlayed = row.time_played / 3600; // Convertir segundos a horas
            timePlayedPerDay[day] = timePlayed;
        });
        result = Object.entries(timePlayedPerDay).map(([day, time_played]) => ({day, time_played}));
        res.json(result);
    });
}   


const countPlayers = async (req, res) => {
    const sql = `SELECT COUNT(*) as players FROM playerData`;
    pool.query(sql, (err, results, fields) => {
        if (err) {
            res.json(err);
        }
        res.json(results);
    });
}


const countUsers = async (req, res) => {
    const sql = `SELECT 
                    (SELECT COUNT(*) FROM playerData WHERE id_user IS NOT NULL) as Users,
                    (SELECT COUNT(*) FROM playerData WHERE id_user IS NULL) as notUsers`;
    pool.query(sql, (err, results, fields) => {
        if (err) {
            res.json(err);
        }
        result = [{type: "Users", count: results[0].Users}, {type: "notUsers", count: results[0].notUsers}]
        res.json(result); // Devolvemos el primer resultado ya que ambos resultados estarán en el mismo objeto
    });
}




module.exports = {doLoginPlayer, createPlayer, getPlayers, getTotalScore, getLeaderboard, timePlayedAll, countPlayers, countUsers}; //Exportamos las funciones
