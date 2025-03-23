const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',
    password: 'Nida1234*',
    database: 'intro_db', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool