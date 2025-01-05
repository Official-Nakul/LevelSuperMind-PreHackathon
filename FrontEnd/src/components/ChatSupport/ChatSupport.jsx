import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogTitle } from "@/components/ui/dialog";
import Chat from "../../assets/chat.svg";
import { Textarea } from "@/components/ui/textarea";
import upArrow from "../../assets/upArrow.svg";
import Close from "../../assets/close.svg";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ChatSupport() {
  const [message, setMessage] = useState(""); // Store current message
  const [chatHistory, setChatHistory] = useState([]); // Store chat history
  const [loading, setLoading] = useState(false); // Track loading state
  const [loadingAlert, setLoadingAlert] = useState(false); // Track loading state
  const bottomRef = useRef(null); // Reference for scrolling to bottom

  const handleSend = async () => {
    if (message.trim() === "") return;
    if (loading) {
      setLoadingAlert(true);
      setTimeout(() => setLoadingAlert(false), 3000);
      return;
    }
    // Add user message to chat history
    const newMessage = { sender: "user", text: message };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    setMessage(""); // Clear input field
    setLoading(true); // Start loading skeleton

    try {
      const msg = message;
      setMessage("");
      const response = await axios.post(
        "https://levelsupermind-backend.onrender.com/api/chat",
        {
          msg,
        }
      );

      // Assuming response contains chatbot's reply in Markdown format
      const chatbotMessage =
        response.data.outputs[0].outputs[0].results.message.data.text;

      // Add chatbot's response to chat history
      const botMessage = { sender: "bot", text: chatbotMessage };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        sender: "bot",
        text: "Error occurred, please try again.",
      };
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
    }

    setLoading(false); // Stop loading skeleton
  };

  // Scroll to the bottom whenever chatHistory changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="h-12 w-12 rounded-full">
          <Button className="p-0 h-12 w-12 rounded-full">
            <img src={Chat} alt="Open Chat" />
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-gray-100 vis" aria-describedby="chat-drawer">
        <div id="chat-drawer" className="sr-only">
          Chat support dialog where you can ask questions.
        </div>
        <DrawerHeader>
          <Alert
            variant="destructive"
            className={`${loadingAlert ? "visible" : "hidden"} mt-2`}
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Wait until the response of previous question
            </AlertDescription>
          </Alert>
          <DialogTitle className="sr-only">Chat Support</DialogTitle>
          <DrawerClose>
            <Button
              variant="ghost"
              className="p-0 h-10 w-10 rounded-full fixed right-2 top-2"
            >
              <img src={Close} alt="Close Chat" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar p-4">
          {/* Display chat history */}
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`${
                message.sender === "user"
                  ? "self-end w-fit"
                  : "self-start min-w-[30%]"
              } max-w-xs p-3 rounded-lg mb-2 ${
                message.sender === "user" ? "bg-green-100" : "bg-blue-100"
              }`}
            >
              <span className="text-sm text-gray-800">
                {message.sender === "bot" ? (
                  <ReactMarkdown>{message.text}</ReactMarkdown> // Render markdown
                ) : (
                  message.text
                )}
              </span>
            </div>
          ))}

          {/* Loading skeleton */}
          {loading && (
            <div className="self-start max-w-xs min-w-48 p-3 rounded-lg mb-2 bg-gray-300 animate-pulse">
              <span className="text-gray-600 text-lg font-bold">...</span>
            </div>
          )}

          {/* Scroll to bottom */}
          <div ref={bottomRef} />
        </div>
        <DrawerFooter>
          <div className="h-fit flex justify-around items-center gap-4 w-full px-4">
            <Textarea
              className="resize-none py-3 px-4 h-11 min-h-0 no-scrollbar outline-none rounded-full flex-1 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Ask AI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevent new line
                  handleSend(); // Call the handleSend function
                }
              }}
            />
            <Button className="rounded-full h-10 w-10 p-0" onClick={handleSend}>
              <img src={upArrow} alt="Send" />
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ChatSupport;
