import React from "react";
import { MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileCard = ({ roomIdDetails }) => {
  return (
    <div className="w-full max-w-xs bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 flex flex-col items-center border border-gray-100">
      {/* Avatar Container */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-amber-50 rounded-full flex items-center justify-center mb-3 sm:mb-4">
        <User 
          size={32} 
          className="sm:size-[40px] md:size-[48px]" 
          color="#4B2E4C" 
        />
      </div>
      
      {/* Seller Name */}
      <h2 className="text-lg sm:text-xl font-medium text-teal-800 mb-4 sm:mb-6 text-center line-clamp-1">
        {roomIdDetails.sellerName || "Property Owner"}
      </h2>
      
      {/* Chat Button */}
      <Link 
        to="/chat" 
        state={{ roomIdDetails }}
        className="w-full max-w-[200px]"
      >
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-colors duration-200 active:scale-95">
          <MessageSquare size={18} className="sm:size-[20px]" />
          <span className="text-sm sm:text-base">Chat with Owner</span>
        </button>
      </Link>
    </div>
  );
};

export default ProfileCard;