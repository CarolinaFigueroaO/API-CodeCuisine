const e = require('express');
const pool = require('../helpers/mysql-config'); //Importing the database configuration
const { use } = require('../routes/levelProgress');

const validateUser = async (req, res) => {
    const email = req.body.email; //Getting the email from the request
    const sql = `SELECT COUNT(*) as count FROM userData WHERE email = ?`;
    const user_name = '';
    pool.query(sql, [email], (err, results, fields) => { //The callback function is executed when the query is done
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        else{
            if(results[0].count === 1){ //If the user and password are correct
                const getName = `SELECT user_name FROM userData WHERE email = ?`;
                pool.query(getName, [email], (err, results, fields) => {
                    if (err) {
                        res.json(err); //If there is an error, we send the error
                    }
                    else{
                        result = {user_name: results[0].user_name}; //We create the result
                        res.json(result);
                        console.log(result);

                    }
                })    
            }
            else{ //If the user and password are incorrect
                result = {user_name: "Usuario no encontrado"} //We create the result]
                res.json(result);
                console.log(result);

            }
        }
    })
    console.log(req.body);
}

module.exports = {validateUser}; //Exportamos las funciones