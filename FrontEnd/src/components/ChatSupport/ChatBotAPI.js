// // Note: Replace **<YOUR_APPLICATION_TOKEN>** with your actual Application token

// /*class LangflowClient {
//   constructor(baseURL, applicationToken) {
//     this.baseURL = baseURL;
//     this.applicationToken = applicationToken;
//   }
//   async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
//     headers["Authorization"] = `Bearer ${this.applicationToken}`;
//     headers["Content-Type"] = "application/json";
//     const url = `${this.baseURL}${endpoint}`;
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(body),
//       });

//       const responseMessage = await response.json();
//       if (!response.ok) {
//         throw new Error(
//           `${response.status} ${response.statusText} - ${JSON.stringify(
//             responseMessage
//           )}`
//         );
//       }
//       return responseMessage;
//     } catch (error) {
//       console.error("Request Error:", error.message);
//       throw error;
//     }
//   }

//   async initiateSession(
//     flowId,
//     langflowId,
//     inputValue,
//     inputType = "chat",
//     outputType = "chat",
//     stream = false,
//     tweaks = {}
//   ) {
//     const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
//     return this.post(endpoint, {
//       input_value: inputValue,
//       input_type: inputType,
//       output_type: outputType,
//       tweaks: tweaks,
//     });
//   }

//   handleStream(streamUrl, onUpdate, onClose, onError) {
//     const eventSource = new EventSource(streamUrl);

//     eventSource.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       onUpdate(data);
//     };

//     eventSource.onerror = (event) => {
//       console.error("Stream Error:", event);
//       onError(event);
//       eventSource.close();
//     };

//     eventSource.addEventListener("close", () => {
//       onClose("Stream closed");
//       eventSource.close();
//     });

//     return eventSource;
//   }

//   async runFlow(
//     flowIdOrName,
//     langflowId,
//     inputValue,
//     inputType = "chat",
//     outputType = "chat",
//     tweaks = {},
//     stream = false,
//     onUpdate,
//     onClose,
//     onError
//   ) {
//     try {
//       const initResponse = await this.initiateSession(
//         flowIdOrName,
//         langflowId,
//         inputValue,
//         inputType,
//         outputType,
//         stream,
//         tweaks
//       );
//       console.log("Init Response:", initResponse);
//       if (
//         stream &&
//         initResponse &&
//         initResponse.outputs &&
//         initResponse.outputs[0].outputs[0].artifacts.stream_url
//       ) {
//         const streamUrl =
//           initResponse.outputs[0].outputs[0].artifacts.stream_url;
//         console.log(`Streaming from: ${streamUrl}`);
//         this.handleStream(streamUrl, onUpdate, onClose, onError);
//       }
//       return initResponse;
//     } catch (error) {
//       console.error("Error running flow:", error);
//       onError("Error initiating session");
//     }
//   }
// }

// async function main(
//   inputValue,
//   inputType = "chat",
//   outputType = "chat",
//   stream = false
// ) {
//   const flowIdOrName = "chatbot";
//   const langflowId = "3f72852c-da98-44aa-8093-aeed3f3002db";
//   const applicationToken = "<YOUR_APPLICATION_TOKEN>";
//   const langflowClient = new LangflowClient(
//     "https://api.langflow.astra.datastax.com",
//     applicationToken
//   );

//   try {
//     let response = await langflowClient.runFlow(
//       flowIdOrName,
//       langflowId,
//       inputValue,
//       inputType,
//       outputType,
//       stream,
//       (data) => console.log("Received:", data.chunk), // onUpdate
//       (message) => console.log("Stream Closed:", message), // onClose
//       (error) => console.log("Stream Error:", error) // onError
//     );
//     if (!stream && response && response.outputs) {
//       const flowOutputs = response.outputs[0];
//       const firstComponentOutputs = flowOutputs.outputs[0];
//       const output = firstComponentOutputs.outputs.message;
//       console.log(`response: ${response}`);
//       console.log(`flowoutput: ${flowOutputs}`);
//       console.log(`firstcomponent: ${firstComponentOutputs}`);
//       console.log(`output: ${output}`);

//       console.log("Final Output:", output.message.text);
//     }
//   } catch (error) {
//     console.error("Main Error", error.message);
//   }
// }
// export default main();*/

// import { axios } from "axios";

// const BASE_API_URL = "https://api.langflow.astra.datastax.com";
// const LANGFLOW_ID = "3f72852c-da98-44aa-8093-aeed3f3002db";
// const FLOW_ID = "07c0a762-5467-428b-bf6f-fc38343755af";
// const APPLICATION_TOKEN = "<YOUR_APPLICATION_TOKEN>";
// const ENDPOINT = "chatbot"; // The endpoint name of the flow

// async function runFlow(message) {
//   const apiUrl = `${BASE_API_URL}/lf/${LANGFLOW_ID}/api/v1/run/${ENDPOINT}`;

//   const payload = {
//     input_value: message,
//     output_type: "chat",
//     input_type: "chat",
//   };

//   const headers = {
//     Authorization: `Bearer ${APPLICATION_TOKEN}`,
//     "Content-Type": "application/json",
//   };

//   try {
//     const response = await axios.post(apiUrl, payload, { headers });
//     return response.data;
//   } catch (error) {
//     console.error("Error running flow:", error.response?.data || error.message);
//     return null;
//   }
// }
// async () => {
//   const result = await runFlow("hi");
//   console.log(result);
// };
// export default runFlow;
