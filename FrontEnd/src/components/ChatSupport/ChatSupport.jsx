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
import ReactMarkdown from "react-markdown"; // Import react-markdown

function ChatSupport() {
  const [message, setMessage] = useState(""); // Store current message
  const [chatHistory, setChatHistory] = useState([]); // Store chat history
  const bottomRef = useRef(null); // Reference for scrolling to bottom

  const handleSend = async () => {
    if (message.trim() === "") return;

    // Add user message to chat history
    const newMessage = { sender: "user", text: message };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    try {
      const response = await axios.post(
        "https://levelsupermind-backend.onrender.com/api/chat",
        {
          message,
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

    setMessage(""); // Clear input field
  };

  // Scroll to the bottom whenever chatHistory changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="fixed bottom-10 right-10">
      <Drawer>
        <DrawerTrigger>
          <div className="h-12 w-12 rounded-full">
            <Button className="p-0 h-12 w-12 rounded-full">
              <img src={Chat} alt="Open Chat" />
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-gray-100" aria-describedby="chat-drawer">
          <div id="chat-drawer" className="sr-only">
            Chat support dialog where you can ask questions.
          </div>
          <DrawerHeader>
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
                  message.sender === "user" ? "self-end" : "self-start"
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

            {/* Scroll to bottom */}
            <div ref={bottomRef} />
          </div>
          <DrawerFooter>
            <div className="h-fit flex justify-around items-center gap-4 w-full px-4">
              <Textarea
                className="resize-none py-3 px-4 h-11 min-h-0 no-scrollbar outline-none rounded-full flex-1 focus-visible:ring-offset-0 focus-visible:ring-0"
                placeholder="Ask AI..."
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Fixed typo
              />
              <Button
                className="rounded-full h-10 w-10 p-0"
                onClick={handleSend}
              >
                <img src={upArrow} alt="Send" />
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default ChatSupport;
