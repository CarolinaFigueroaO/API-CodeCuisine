const e = require('express');
const pool = require('../helpers/mysql-config'); //Importing the database configuration
const jwt = require('jsonwebtoken'); //Importamos la librería de jsonwebtoken

const validateUser = async (req, res) => {
    const email = req.body.email; //Getting the email from the request
    const sql = `SELECT COUNT(*) as count, user_name FROM userData WHERE email = ?`; //Creating the query
    pool.query(sql, [email], (err, results, fields) => { //The callback function is executed when the query is done
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        if(results[0].count === 1){ //If the user and password are correct
            const user_name = results[0].user_name;
            const token = jwt.sign({user_name: user_name}, process.env.KEYPHRASE, {expiresIn: 7200}); //We create the token
            result = {user_name: user_name, token: token}; //We create the result
            res.json(result); //We send the result
            const validatePlayer = `SELECT COUNT(*) as count FROM playerData WHERE id_user = (SELECT id_user FROM userData WHERE email = ?)`;
            pool.query(validatePlayer, [email], (err, results, fields) => { //The callback function is executed when the query is done
                if (err) {
                    res.json(err); //If there is an error, we send the error
                }
                if(results[0].count === 0){ //If the user does not exist
                    const sql = `INSERT INTO playerData (player_name, id_user) VALUES (?, (SELECT id_user FROM userData WHERE email = ?))`; //Creating the query
                    pool.query(sql, [user_name, email], (err, results, fields) => { //The callback function is executed when the query is done
                        if (err) {
                            res.json(err); //If there is an error, we send the error
                        }
                    });
                }
            });
        }
        else{ //If the user and password are incorrect
            result = {user_name: "", token: token}; //We create the result
            res.json(result); //We send the result
        }
    })
}




module.exports = {validateUser}; //Exportamos las funciones