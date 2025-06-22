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
  Briefcase,
  X
} from "lucide-react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../assets/img1.jpeg";

const MyListings = () => {
  const { userId } = useAuthContext();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleDeleteClick = (listing) => {
    setListingToDelete(listing);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!listingToDelete) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:3000/api/listing/delete-listing/${listingToDelete._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete listing");
      setListings(listings.filter((listing) => listing._id !== listingToDelete._id));
      setShowDeleteModal(false);
      setListingToDelete(null);
    } catch (error) {
      console.error("Error deleting listing:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setListingToDelete(null);
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
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-green-600 to-green-500 py-6 px-6 sm:py-8 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">My Premium Listings</h2>
              <p className="text-green-100 text-sm sm:text-base mt-1">Manage your property listings in one place</p>
            </div>
            <Link
              to="/form/profile"
              className="bg-white text-green-600 py-2 px-4 sm:py-2.5 sm:px-5 rounded-lg sm:rounded-xl hover:bg-green-50 transition-colors inline-flex items-center gap-2 font-medium shadow-sm text-sm sm:text-base"
            >
              <PlusCircle size={16} className="sm:size-[18px]" />
              <span>Add New Listing</span>
            </Link>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {listings.length === 0 ? (
            <div className="text-center py-12 sm:py-16 px-4">
              <div className="bg-green-50 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Home size={24} className="sm:size-[32px] text-green-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No Listings Found</h3>
              <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-6 sm:mb-8">
                You haven't posted any rooms yet. Create your first listing to start showcasing your property.
              </p>
              <Link
                to="/form/profile"
                className="bg-green-600 text-white py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors inline-flex items-center gap-2 font-medium shadow-md text-sm sm:text-base"
              >
                <PlusCircle size={16} className="sm:size-[18px]" />
                <span>Create Your First Listing</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {listings.map((room) => (
                <div
                  key={room._id}
                  className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md sm:hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
                    <img
                      src={room?.photos?.[0]?.url || img1} 
                      alt={room.description || "Room image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white bg-opacity-90 rounded-full py-1 px-2 sm:px-3 shadow-md">
                      <div className="flex items-center">
                        <IndianRupee size={12} className="sm:size-[14px] text-green-600 mr-1" />
                        <span className="font-bold text-gray-800 text-sm sm:text-base">
                          {room.rent?.toLocaleString() || "N/A"}
                        </span>
                        <span className="text-gray-500 text-xs ml-1">/month</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6" onClick={() => navigate(`/property/${room._id}`)}>
                    <div className="mb-3 sm:mb-4">
                      <h3 className="font-bold text-lg sm:text-xl text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors">
                        {room.roomType} in {room.buildingType}
                      </h3>
                      <div className="flex items-center text-gray-600 mt-1 sm:mt-2">
                        <MapPinned size={14} className="sm:size-[16px] mr-1 sm:mr-2 flex-shrink-0 text-green-600" />
                        <span className="text-xs sm:text-sm line-clamp-1">{room.address.city},{room.address.state},{room.address.country}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 sm:mb-6 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-100 rounded-full p-1.5 sm:p-2 mb-1 sm:mb-2">
                          <Building size={14} className="sm:size-[16px] text-green-600" />
                        </div>
                        <span className="text-xs text-gray-500 mb-0.5 sm:mb-1">Type</span>
                        <span className="text-xs sm:text-sm font-medium text-center">
                          {room.roomType || "Any"}
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-100 rounded-full p-1.5 sm:p-2 mb-1 sm:mb-2">
                          <Users size={14} className="sm:size-[16px] text-blue-600" />
                        </div>
                        <span className="text-xs text-gray-500 mb-0.5 sm:mb-1">For</span>
                        <span className="text-xs sm:text-sm font-medium text-center">
                          {room.genderLookingFor || "Any"}
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="bg-purple-100 rounded-full p-1.5 sm:p-2 mb-1 sm:mb-2">
                          <Briefcase size={14} className="sm:size-[16px] text-purple-600" />
                        </div>
                        <span className="text-xs text-gray-500 mb-0.5 sm:mb-1">Occupation</span>
                        <span className="text-xs sm:text-sm font-medium text-center">
                          {room.occupation || "Any"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/chatMessages/${room._id}`);
                        }}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium"
                      >
                        <MessageCircle size={14} className="sm:size-[16px]" />
                        <span>Chat</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/edit-listing/${room._id}`);
                        }}
                        className="bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium"
                      >
                        <Edit size={14} className="sm:size-[16px]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(room);
                        }}
                        className="bg-red-50 hover:bg-red-100 text-red-600 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium"
                      >
                        <Trash2 size={14} className="sm:size-[16px]" />
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Delete Listing</h3>
              <button
                onClick={handleDeleteCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this listing? This action cannot be undone.
              </p>
              
              {listingToDelete && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={listingToDelete?.photos?.[0]?.url || img1}
                      alt="Listing"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {listingToDelete.roomType} in {listingToDelete.buildingType}
                      </h4>
                      <p className="text-sm text-gray-600">
                        ₹{listingToDelete.rent?.toLocaleString()}/month
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyListings;