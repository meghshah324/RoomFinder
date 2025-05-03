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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-green-600 text-white p-4 text-center">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>
      <div className="h-[400px] overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble
            key={message._id || message.timestamp}
            message={message}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex p-4 border-t">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!conversationId}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || !conversationId}
          className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
