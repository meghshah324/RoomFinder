import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Send } from "lucide-react";

const ChatPage = () => {
  const { roomId, conversationId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [property, setProperty] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const messagesEndRef = useRef(null);
  const currentUserId = "seller123";

  // Fetch conversation and messages
  useEffect(() => {
    const fetchConversationData = async () => {
      setLoading(true);
      try {
        // Mock property
        const mockProperty = {
          roomType: "2BHK",
          buildingType: "Flat",
          location: "HSR Layout, Bangalore"
        };
        setProperty(mockProperty);
  
        // Mock buyer
        const mockBuyer = {
          _id: "buyer456",
          name: "Alice Johnson"
        };
        setBuyer(mockBuyer);
  
        // Mock conversation
        const mockConversation = {
          _id: conversationId,
          buyer: mockBuyer
        };
        setConversation(mockConversation);
  
        // Mock messages
        const mockMessages = [
          {
            _id: "m1",
            senderId: "buyer456",
            text: "Hi, is this room still available?",
            createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hr ago
          },
          {
            _id: "m2",
            senderId: "seller123",
            text: "Yes, it is. You can visit this weekend.",
            createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
          },
          {
            _id: "m3",
            senderId: "buyer456",
            text: "Great, I’ll come by Saturday morning!",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
          },
        ];
        setMessages(mockMessages);
  
        setLoading(false);
      } catch (err) {
        setError("Failed to load conversation. Please try again.");
        setLoading(false);
        console.error(err);
      }
    };
  
    fetchConversationData();
  
    const intervalId = setInterval(() => {
      // You can simulate polling here by adding new mock messages if needed
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [roomId, conversationId]);
  
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const fetchNewMessages = async () => {
    try {
      // Only fetch messages newer than the last one we have
      const lastMessageTime = messages.length > 0 
        ? messages[messages.length - 1].createdAt 
        : null;
        
      const messagesResponse = await axios.get(
        `/api/conversations/${conversationId}/messages?after=${lastMessageTime}`
      );
      
      if (messagesResponse.data.length > 0) {
        setMessages(prev => [...prev, ...messagesResponse.data]);
      }
    } catch (err) {
      console.error("Error fetching new messages:", err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    try {
      const messageData = {
        conversationId,
        senderId: currentUserId,
        text: newMessage,
      };
      
      // Optimistically add message to UI
      const tempMessage = {
        _id: Date.now().toString(),
        senderId: currentUserId,
        text: newMessage,
        createdAt: new Date().toISOString(),
        isTemp: true,
      };
      
      setMessages(prev => [...prev, tempMessage]);
      setNewMessage("");
      
      // Send to server
      const response = await axios.post(`/api/conversations/${conversationId}/messages`, messageData);
      
      // Replace temp message with real one
      setMessages(prev => prev.map(msg => 
        msg.isTemp ? response.data : msg
      ));
    } catch (err) {
      console.error("Error sending message:", err);
      // Handle error (maybe show a retry button)
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <button 
            onClick={() => navigate(`/messages/${roomId}`)} 
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-medium text-lg text-gray-800">{buyer?.name}</h1>
            <p className="text-sm text-gray-500">
              {property?.roomType} in {property?.buildingType} • {property?.location}
            </p>
          </div>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 pb-4">
            {messages.map((message) => {
              const isCurrentUser = message.senderId === currentUserId;
              
              return (
                <div 
                  key={message._id} 
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                      isCurrentUser 
                        ? 'bg-green-500 text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <div className={`text-xs mt-1 ${isCurrentUser ? 'text-green-100' : 'text-gray-500'}`}>
                      {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      {/* Message input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={`ml-2 p-2 rounded-full ${
                newMessage.trim() 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-gray-200 cursor-not-allowed'
              }`}
            >
              <Send size={20} className={newMessage.trim() ? 'text-white' : 'text-gray-400'} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;