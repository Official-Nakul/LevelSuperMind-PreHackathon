const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Import routes
const chatRoute = require("./Routes/chatRoute");
/*const graphDataRoute = require("./Routes/graphDataRoute");*/

// Middleware setup
app.use(cors()); // Allow requests from the frontend
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes setup
app.use("/api", chatRoute); // Chat route
/*app.use("/api", graphDataRoute); // Graph data route*/
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
