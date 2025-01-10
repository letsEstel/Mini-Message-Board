const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: process.env.DB_USER,
  database: "message_board",
  password: process.env.DB_PWD,
  port: 5432, // The default port
});
