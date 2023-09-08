import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_SCHEMA,
  password: process.env.DB_PASSWORD,
});

export default connection;
