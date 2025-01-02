const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors()); // Allow requests from the frontend
app.use(bodyParser.json()); // Parse JSON request bodies

const BASE_API_URL = "https://api.langflow.astra.datastax.com";
const LANGFLOW_ID = process.env.LANGFLOW_ID;
const FLOW_ID = process.env.FLOW_ID;
const APPLICATION_TOKEN = process.env.APPLICATION_TOKEN;
const ENDPOINT = "chatbot"; // The endpoint name of the flow

async function runFlow(message) {
  const apiUrl = `${BASE_API_URL}/lf/${LANGFLOW_ID}/api/v1/run/${ENDPOINT}`;
  const payload = {
    input_value: message,
    output_type: "chat",
    input_type: "chat",
  };

  const headers = {
    Authorization: `Bearer ${APPLICATION_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(apiUrl, payload, { headers });
    return response.data;
  } catch (error) {
    console.error("Error running flow:", error.response?.data || error.message);
    throw error;
  }
}

// Define the API endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const chatbotResponse = await runFlow(message);
    res.json(chatbotResponse);
  } catch (error) {
    res.status(500).json({ error: "Error running chatbot flow." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
