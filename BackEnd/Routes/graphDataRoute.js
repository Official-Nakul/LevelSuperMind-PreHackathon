const express = require("express");
const router = express.Router();
const { DataAPIClient } = require("@datastax/astra-db-ts");
require("dotenv").config();
const axios = require("axios");

const DB_TOKEN = process.env.ASTRA_DB_TOKEN;
const DB_URL = process.env.ASTRA_DB_URL;
const new_url =
  "https://9545ec75-ca1a-45a9-beca-bc2fa6c8077b-us-east1.apps.astra.datastax.com/api/json/v1";
// Initialize the client
const client = new DataAPIClient(DB_TOKEN);
const db = client.db(DB_URL);
let data;
(async () => {
  const collection = db.collection("csv");
  data = await collection.find({ field: "value" });
})();

router.post("/data", (req, res) => {
  if (!data) {
    return res.status(500).json({ error: "Collections not loaded yet" });
  }
  res.json(data);
});

const DB_URL_CSV =
  "https://9545ec75-ca1a-45a9-beca-bc2fa6c8077b-us-east1.apps.astra.datastax.com/api/json/v1";

// Set up the headers for the request
const headers = {
  Authorization: `Bearer ${DB_TOKEN}`,
  "Content-Type": "application/json",
};

(async () => {
  try {
    // Make a GET request to the AstraDB API
    const response = await axios.get(DB_URL_CSV, { headers });

    // Log the response data
    console.log("Data from AstraDB:", response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();

module.exports = router;
