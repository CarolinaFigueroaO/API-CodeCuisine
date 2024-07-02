const pool = require('../helpers/mysql-config'); //Importing the database configuration
const jwt = require('jsonwebtoken'); //Importing the jsonwebtoken library

const doLoginAdmin = async (req, res) => {
    const email = req.body.email; //Getting the email from the request
    const password = req.body.password; //Getting the password from the request
    let token = '';
    let result = {};
    //Verifying the user and password
    const sql = `SELECT COUNT(*) as count FROM adminData WHERE email = ? AND password =SHA2(?,224)`;
    pool.query(sql, [email, password], (err, results, fields) => { //The callback function is executed when the query is done
        
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        if(results[0].count === 1){ //If the user and password are correct
            token = jwt.sign({email:email}, process.env.KEYPHRASE, {expiresIn: 172800}); //We create the token
            result = {token: token, mensaje: 'Correo  y contraseña correctos'} //We create the result
        }
        else{ //If the user and password are incorrect
            result = {token: token, mensaje: 'Correo  o contraseña incorrectos'} //We create the result
        }

        res.json(result); //We send the result
    })

};

const addAdmin = async (req, res) => {
    const email = req.body.email; //Getting the email from the request
    const password = req.body.password; //Getting the password from the request
    const verifyAdmin = `SELECT COUNT(*) as count FROM adminData WHERE email = ?`;
    pool.query(verifyAdmin, [email], (err, results, fields) => { //The callback function is executed when the query is done
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        if(results[0] && results[0].count === 0){ //If the user does not exist
            const sql = `INSERT INTO adminData (email, password) VALUES (?, SHA2(?,224))`; //Creating the query
            pool.query(sql, [email, password], (err, results, fields) => { //The callback function is executed when the query is done
                if (err) {
                    res.json(err); //If there is an error, we send the error
                }
                else{
                    result = {message: "Admin created"}; //We create the response
                    res.json(result); //We send the result
                }
            });
        }
        else{ //If the user exists
            result = {message: "Admin already exists"}; //We create the response
            res.json(result); //We send the result
        }
    });
}


module.exports = {doLoginAdmin, addAdmin}; //Exportamos las funciones
