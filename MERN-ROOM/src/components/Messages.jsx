import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageCircle, ArrowLeft, User } from "lucide-react";

const MessagesListPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [property, setProperty] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      console.log("Fetching conversations for roomId:", roomId);

      try {
        const response = await fetch(
          `http://localhost:3000/api/conversations/property/${roomId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const conversationsResponse = await response.json();
        setConversations(conversationsResponse);
      } catch (err) {
        setError("Failed to load conversations. Please try again.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchConversations();
    }
  }, [roomId]);

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
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/my-listings")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back to Listings</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          Messages for this Room Listing
        </h1>
      </div>

      {/* Conversations List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {conversations.length === 0 ? (
          <div className="p-8 text-center">
            <MessageCircle size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-gray-700 font-medium mb-1">No Messages Yet</h3>
            <p className="text-gray-500">
              When someone messages you about this property, they will appear
              here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {conversations.map((conversation) => (
              <li key={conversation._id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-100 rounded-full p-2 mr-3">
                      <User size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {conversation.buyerName}
                      </h3>
                      {/* <p className="text-sm text-gray-500">
                        Last message: {new Date(conversation.lastMessageTime).toLocaleString()}
                      </p> */}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/messages/${conversation._id}`, {
                        state: {
                          buyerId: conversation.buyerId,
                          sellerId: conversation.sellerId,
                          propertyId: conversation.propertyId,
                        },
                      })
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <MessageCircle size={16} className="mr-1" />
                    <span>Chat</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessagesListPage;
