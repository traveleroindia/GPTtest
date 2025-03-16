import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 100,  // Adjust as necessary
  queueLimit: 0,        // No limit
});

export async function connectDB() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    console.log('Database connection established');
    return connection; // Return the connection
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error; // Rethrow the error
  }
}