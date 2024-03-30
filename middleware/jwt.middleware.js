const jwt = require('jsonwebtoken'); //Importing the jsonwebtoken library
const express = require('express');
const middleware = express.Router(); //Creating the middleware

const verifyJTW = (req, res, next) => {
    let token = req.headers['authorization']; //Getting the token from the headers 
    //Falsy or truthy
    if(token){
        token = token.split(' ')[1]; //Getting the token from the header
        //Verifying the token
        jwt.verify(token, process.env.KEYPHRASE, (err, decoded) => { //The keyphrase is the secret key
            if(err){
                //If the token is invalid
                return res.status(403).json({mensaje: 'Token invalido'});
            }
            else{
                //If the token is valid
                next();
            }
        });
    } else{
        return res.status(401).send({mensaje: 'Token no proporcionado'});
    }

}

middleware.use(verifyJTW); //Using the middleware

module.exports = middleware; //Exporting the middleware