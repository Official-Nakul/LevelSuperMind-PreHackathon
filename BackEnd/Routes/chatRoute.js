require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

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
router.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const chatbotResponse = await runFlow(message);
    res.json(chatbotResponse);
  } catch (error) {
    res.status(500).json({ error: "Error running chatbot flow." });
  }
});

module.exports = router;
