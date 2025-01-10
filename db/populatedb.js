const { Client } = require("pg");
require("dotenv").config();
// SQL to create the table
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    post TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL
);
`;

// Example messages to insert
const messages = [
  {
    post: "Hello, world!",
    name: "Alice",
    date: new Date("2025-01-01T10:00:00"),
  },
  {
    post: "I want to be real for you",
    name: "Joi",
    date: new Date("2049-08-17T12:00:00"),
  },
  {
    post: "This is a great message board!",
    name: "Charlie",
    date: new Date("2025-01-03T14:00:00"),
  },
  {
    post: "Happy New Year!",
    name: "Diana",
    date: new Date("2025-01-01T00:00:00"),
  },
];

async function populateDatabase() {
  let client; // Declare client outside the try block for proper cleanup

  try {
    console.log("Connecting to the database...");

    // Initialize the client
    client = new Client({
      connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PWD}@localhost:5432/message_board`,
    });

    // Connect to the database
    await client.connect();
    console.log("Connected to the database.");

    // Drop the table if exits
    await client.query("DROP TABLE IF EXISTS messages;");
    console.log("Cleared existing data.");

    // Create the table if it doesn't exist
    await client.query(SQL);
    console.log("Table created or already exists.");

    // Insert each message into the table
    for (const message of messages) {
      const { post, name, date } = message;
      await client.query(
        "INSERT INTO messages (post, name, date) VALUES ($1, $2, $3)",
        [post, name, date]
      );
    }
    console.log("Messages inserted successfully.");
  } catch (err) {
    console.error("Error populating the database:", err);
  } finally {
    // Ensure the client is properly closed
    if (client) {
      await client.end();
      console.log("Database connection closed.");
    }
  }
}

// Run the populate script
populateDatabase();
