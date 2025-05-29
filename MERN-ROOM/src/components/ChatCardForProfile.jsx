import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Send, User, Bot } from "lucide-react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useLocation, useParams } from "react-router-dom";

const socket = io("http://localhost:3000");

const ChatBot = () => {
  const location = useLocation();
  const { buyerId, sellerId, propertyId } = location.state || {};
  const { conversationId } = useParams();
  const { userId } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const generateRoomID = (buyerId, sellerId, listingId) => {
    if (!buyerId || !sellerId || !listingId) return null;
    const sortedIds = [buyerId, sellerId].sort().join("_");
    return `${sortedIds}_${listingId}`;
  };

  const roomId = generateRoomID(buyerId, sellerId, propertyId);



  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const messagesResponse = await fetch(
          `http://localhost:3000/api/conversations/${conversationId}/messages`
        );

        if (!messagesResponse.ok) throw new Error("Failed to fetch messages");

        const messagesData = await messagesResponse.json();
        setMessages(messagesData);

        if (roomId) {
          socket.emit("joinConversation", roomId);
        }

        socket.on("receiveMessage", (newMessage) => {
          setMessages((prev) => {
            const alreadyExists = prev.some(
              (msg) =>
                msg.timestamp === newMessage.timestamp &&
                msg.senderId === newMessage.senderId
            );
            return alreadyExists ? prev : [...prev, newMessage];
          });
        });
      } catch (error) {
        console.error("Chat initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    return () => {
      socket.off("receiveMessage");
      if (roomId) {
        socket.emit("leaveConversation", roomId);
      }
    };
  }, [conversationId, roomId]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !conversationId) return;

    const newMessage = {
      senderId: userId,
      message: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setInputMessage("");

    try {
      // Emit via socket
      if (roomId) {
        socket.emit("sendMessage", { roomId, message: newMessage });
      }

      // Save to DB
      await fetch(
        `http://localhost:3000/api/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage),
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const MessageBubble = ({ message }) => (
    <div
      className={`flex items-end mb-4 ${
        message.senderId === userId ? "justify-end" : "justify-start"
      }`}
      key={message._id || message.timestamp}
    >
      {message.senderId !== userId && (
        <Bot className="w-8 h-8 mr-2 text-green-500" />
      )}
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg ${
          message.senderId === userId
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {message.message}
      </div>
      {message.senderId === userId && (
        <User className="w-8 h-8 ml-2 text-gray-500" />
      )}
    </div>
  );

  if (!conversationId) {
    return <div className="p-4 text-center">No conversation selected</div>;
  }

  if (loading) {
    return <div className="p-4 text-center">Loading chat...</div>;
  }

  return (
  <div className="flex flex-col h-screen bg-gray-50">
  {/* Header */}
  <div className="bg-white shadow-sm">
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center">
        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
        Property Chat
      </h2>
      {/* {propertyDetails && (
        <p className="text-sm text-gray-500 mt-1">
          About: {propertyDetails.title}
        </p>
      )} */}
    </div>
  </div>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full">
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message._id || message.timestamp}
          message={message}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  </div>

  {/* Input */}
  <div className="bg-white border-t py-4 sticky bottom-0">
    <div className="max-w-3xl mx-auto px-4 w-full">
      <div className="flex items-center rounded-full border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent px-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-grow py-3 focus:outline-none bg-transparent"
          disabled={!conversationId}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || !conversationId}
          className="ml-2 p-2 text-green-600 hover:text-green-700 disabled:text-gray-400 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default ChatBot;
