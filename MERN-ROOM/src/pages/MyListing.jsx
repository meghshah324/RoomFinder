import React, { useEffect, useState } from "react";
import {
  Home,
  Edit,
  Trash2,
  IndianRupee,
  MapPinned,
  MessageCircle,
  Loader2,
  PlusCircle,
  Building,
  Users,
  Briefcase
} from "lucide-react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../assets/img1.jpeg";

const MyListings = () => {
  const { userId } = useAuthContext();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const findRooms = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/listing/userroom/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch rooms");
        const data = await res.json();
        setListings(data || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    findRooms();
  }, [userId]);

  const handleDeleteListing = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/listing/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete listing");
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 text-green-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading your premium listings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-green-600 to-green-500 py-8 px-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">My Premium Listings</h2>
              <p className="text-green-100 mt-1">Manage your property listings in one place</p>
            </div>
            <Link
              to="/form/profile"
              className="bg-white text-green-600 py-2.5 px-5 rounded-xl hover:bg-green-50 transition-colors inline-flex items-center gap-2 font-medium shadow-sm"
            >
              <PlusCircle size={18} />
              <span>Add New Listing</span>
            </Link>
          </div>
        </div>

        <div className="p-8">
          {listings.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Home size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Listings Found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                You haven't posted any rooms yet. Create your first listing to start showcasing your property.
              </p>
              <Link
                to="/form/profile"
                className="bg-green-600 text-white py-3 px-8 rounded-xl hover:bg-green-700 transition-colors inline-flex items-center gap-2 font-medium shadow-md"
              >
                <PlusCircle size={18} />
                <span>Create Your First Listing</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {listings.map((room) => (
                <div
                  key={room._id}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={room?.photos?.[0]?.url || img1} 
                      alt={room.description || "Room image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full py-1 px-3 shadow-md">
                      <div className="flex items-center">
                        <IndianRupee size={14} className="text-green-600 mr-1" />
                        <span className="font-bold text-gray-800">
                          {room.rent?.toLocaleString() || "N/A"}
                        </span>
                        <span className="text-gray-500 text-xs ml-1">/month</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6" onClick={() => navigate(`/property/${room._id}`)}>
                    <div className="mb-4">
                      <h3 className="font-bold text-xl text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors">
                        {room.roomType} in {room.buildingType}
                      </h3>
                      <div className="flex items-center text-gray-600 mt-2">
                        <MapPinned size={16} className="mr-2 flex-shrink-0 text-green-600" />
                        <span className="text-sm line-clamp-1">{room.address.city},{room.address.state},{room.address.country}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6 bg-gray-50 rounded-xl p-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-100 rounded-full p-2 mb-2">
                          <Building size={16} className="text-green-600" />
                        </div>
                        <span className="text-xs text-gray-500 mb-1">Type</span>
                        <span className="text-sm font-medium text-center">
                          {room.roomType || "Any"}
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-100 rounded-full p-2 mb-2">
                          <Users size={16} className="text-blue-600" />
                        </div>
                        <span className="text-xs text-gray-500 mb-1">For</span>
                        <span className="text-sm font-medium text-center">
                          {room.genderLookingFor || "Any"}
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="bg-purple-100 rounded-full p-2 mb-2">
                          <Briefcase size={16} className="text-purple-600" />
                        </div>
                        <span className="text-xs text-gray-500 mb-1">Occupation</span>
                        <span className="text-sm font-medium text-center">
                          {room.occupation || "Any"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/chatMessages/${room._id}`);
                        }}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-sm font-medium"
                      >
                        <MessageCircle size={16} />
                        <span>Message</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/edit-listing/${room._id}`);
                        }}
                        className="bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-sm font-medium"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteListing(room._id);
                        }}
                        className="bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-sm font-medium"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListings;