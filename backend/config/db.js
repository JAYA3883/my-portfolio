// config/db.js
// This file handles the connection between your backend and MySQL database

const mysql = require('mysql2');

// Create a connection pool (reusable connections to the database)
const pool = mysql.createPool({
    host: 'localhost',      // MySQL is running on your computer
    user: 'root',           // Your MySQL username
    password: 'Jaya3883',    // ⚠️ CHANGE THIS to YOUR MySQL password!
    database: 'portfolio_db', // The database we created earlier
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert to use promises (modern JavaScript way of handling async operations)
const promisePool = pool.promise();

// Test the connection
const testConnection = async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log('✅ Successfully connected to MySQL database!');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
};

module.exports = { promisePool, testConnection };