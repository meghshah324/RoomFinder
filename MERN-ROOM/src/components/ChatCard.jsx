import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Send, User, Bot } from "lucide-react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:3000");

const ChatbotUI = () => {
  const location = useLocation();
  const { roomIdDetails } = location.state;
  const { userId } = useAuthContext();
  console.log(location.state);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const generateRoomID = (buyerId, sellerId, listingId) => {
    const sortedIds = [buyerId, sellerId].sort().join("_");
    return `${sortedIds}_${listingId}`;
  };

  const roomId = roomIdDetails 
    ? generateRoomID(roomIdDetails.buyerId, roomIdDetails.sellerId, roomIdDetails.roomId)
    : "";

  useEffect(() => {
    if (!roomId) return; 

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/chat/${roomId}`);
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    socket.emit("joinRoom", roomId);

    const handleMessage = (message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg.id === message.id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    };

    socket.on("receivedMessage", handleMessage);

    return () => {
      socket.off("receivedMessage", handleMessage);
      socket.off("joinRoom");
    };
  }, [roomId]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" || !roomId) return;
    const userMessage = {
      id: Date.now(),
      roomId,
      senderId: userId,
      message: inputMessage,
    };
    try {
      socket.emit("sendMessage", userMessage);
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const MessageBubble = ({ message }) => (
    <div
      className={`flex items-end mb-4 ${
        message.senderId === userId ? "justify-end" : "justify-start"
      }`}
    >
      {message.senderId !== userId && (
        <Bot className="w-8 h-8 mr-2 text-green-500" />
      )}
      <div
        className={`
          max-w-[70%] px-4 py-2 rounded-lg 
          ${
            message.senderId === userId
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }
        `}
      >
        {message.message}
      </div>
      {message.senderId === userId && (
        <User className="w-8 h-8 ml-2 text-gray-500" />
      )}
    </div>
  );

  if (!roomIdDetails) {
    return <div className="p-4 text-center">No chat room selected.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-green-600 text-white p-4 text-center">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>
      <div className="h-[400px] overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      <div className="flex p-4 border-t">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotUI;