import React from "react";
import { MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileCard = ({ roomIdDetails }) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-4">
        <User size={48} color="#4B2E4C" />
      </div>
      <h2 className="text-xl text-teal-800 font-medium mb-6">{roomIdDetails.sellerName}</h2>
      <Link to="/chat" state={{ roomIdDetails }}>
        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors">
          <MessageSquare size={20} />
          <span>Chat</span>
        </button>
      </Link>
    </div>
  );
};

export default ProfileCard;
