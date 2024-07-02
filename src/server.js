// App
const app = require("./app");

// Database
const db = require("./db");

// PORT
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    db.connect();
    console.log("Connected to MySQL database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

startServer();
