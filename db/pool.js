const { Pool } = require("pg");

// Use the DATABASE_URL environment variable for Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Railway PostgreSQL
  },
});

module.exports = pool;
