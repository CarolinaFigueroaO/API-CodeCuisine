const pool = require('../helpers/mysql-config'); //Importing the database configuration
const jwt = require('jsonwebtoken'); //Importing the jsonwebtoken library

const doLogin = async (req, res) => {
    const email = req.body.email; //Getting the email from the request
    const password = req.body.password; //Getting the password from the request
    let token = '';
    let result = {};
    //Verifying the user and password
    const sql = `SELECT COUNT(*) as count FROM userData WHERE email = ? AND password =SHA2(?,224)`;
    pool.query(sql, [email, password], (err, results, fields) => { //The callback function is executed when the query is done
        
        if (err) {
            res.json(err); //If there is an error, we send the error
        }
        if(results[0].count === 1){ //If the user and password are correct
            token = jwt.sign({email:email}, process.env.KEYPHRASE, {expiresIn: 7200}); //We create the token
            result = {token: token, mensaje: 'Correo  y contraseña correctos'} //We create the result
        }
        else{ //If the user and password are incorrect
            result = {token: token, mensaje: 'Correo  o contraseña incorrectos'} //We create the result
        }

        res.json(result); //We send the result
    })

};


module.exports = {doLogin}; //Exportamos las funciones
