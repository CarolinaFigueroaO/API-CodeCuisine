const mysql2 = require('mysql2');
require('dotenv').config(); //Importamos dotenv para poder usar las variables de entorno

const pool = mysql2.createPool({ //Creamos el pool de conexiones
    connectionLimit: 10,
    host: process.env.DBHOST, //variables de entorno para no exponer la información
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    port: process.env.DBPORT
});

pool.getConnection((err, connection) => {
    if (err) {
        throw err;
    console.log('Conectado a la base de datos');
    connection.release(); //Liberamos la conexión cuando no la necesitemos
    }
});

module.exports = pool; //Exportamos el pool de conexiones