const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend/.env or root .env
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_r3petshop',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Database Connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`[Database] Successfully connected to MySQL database "${process.env.DB_NAME || 'db_r3petshop'}"!`);
    connection.release();
  } catch (error) {
    console.error('[Database Connection Error]', error.message);
    console.error('Make sure MySQL service (XAMPP/phpMyAdmin) is running and database "db_r3petshop" exists.');
  }
};

testConnection();

module.exports = pool;
