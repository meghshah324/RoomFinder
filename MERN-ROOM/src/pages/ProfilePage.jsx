import React, { useEffect, useState } from "react";
import {
  User,
  Home,
  Edit,
  Trash2,
  Settings,
  ChevronRight,
  IndianRupee,
  MapPinned,
  MessageCircle,
} from "lucide-react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import img1 from "../assets/img1.jpeg";

const ProfilePage = () => {
  const { userId, userName, email } = useAuthContext();
  const [user, setUser] = useState({});
  const [listings, setListings] = useState([]);
  const [activeTab, setActiveTab] = useState("listings");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setUser({
      name: userName || "",
      email: email || "",
      profilePicture: null,
      userId,
    });
    const findRooms = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/listing/userroom/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        console.log(res);
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
  }, [userName, email, userId]);

  const handleDeleteListing = async (id) => {
    console.error("Error deleting listing:");
  };

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (!userId) {
    return <p>Please log in to view your profile</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Profile Header - Removed any potential nested links */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
            <User size={48} className="text-green-700" />
          </div>
          <div className="flex-col justify-center items-center text-center md:text-left mt-4">
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600 mb-2">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Ensure buttons are not nested in links */}
        <div className="w-full md:w-64">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <nav className="flex flex-col">
              <button
                onClick={() => setActiveTab("listings")}
                className={`flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors ${
                  activeTab === "listings"
                    ? "bg-green-50 text-green-700 border-l-4 border-green-700"
                    : ""
                }`}
              >
                <Home size={20} />
                <span>My Listings</span>
                <ChevronRight size={16} className="ml-auto" />
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors ${
                  activeTab === "settings"
                    ? "bg-green-50 text-green-700 border-l-4 border-green-700"
                    : ""
                }`}
              >
                <Settings size={20} />
                <span>Profile Settings</span>
                <ChevronRight size={16} className="ml-auto" />
              </button>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === "listings" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  My Room Listings
                </h2>
                <Link
                  to="/form/profile"
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                >
                  <Home size={16} />
                  <span>Add New Listing</span>
                </Link>
              </div>

              {listings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Home size={48} className="mx-auto mb-4 opacity-30" />
                  <p>You haven't posted any rooms yet.</p>
                  <Link
                    to="/form/profile"
                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors inline-block"
                  >
                    Create Your First Listing
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols grid-cols-2 gap-6 w-full">
                {listings.map((room) => (
                  <div
                    key={room._id}
                    onClick={() => navigate(`/property/${room._id}`)}
                    className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="relative h-48 w-full">
                      <img
                        src={img1}
                        alt={room.description || "Room image"}
                        className="w-full h-full object-cover"
                      />
                    </div>
              
                    {/* Card content */}
                    <div className="p-4">
                      {/* Title and basic info */}
                      <div className="mb-3">
                        <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                          {room.roomType} in {room.buildingType}
                        </h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <MapPinned
                            size={14}
                            className="mr-1 flex-shrink-0"
                          />
                          <span className="text-sm line-clamp-1">
                            {room.location}
                          </span>
                        </div>
                      </div>
              
                      {/* Price highlight */}
                      <div className="flex items-center mb-3">
                        <IndianRupee
                          size={16}
                          className="text-gray-700 mr-1"
                        />
                        <span className="text-lg font-bold text-gray-800">
                          {room.rent?.toLocaleString() || "N/A"}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">
                          /month
                        </span>
                      </div>
              
                      {/* Quick facts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-gray-50 rounded-lg p-2 mb-4">
                        <div className="flex flex-col items-center p-1">
                          <span className="text-xs text-gray-500">Type</span>
                          <span className="text-sm font-medium">
                            {room.roomType || "Any"}
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-1">
                          <span className="text-xs text-gray-500">For</span>
                          <span className="text-sm font-medium">
                            {room.genderLookingFor || "Any"}
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-1">
                          <span className="text-xs text-gray-500">
                            Occupation
                          </span>
                          <span className="text-sm font-medium">
                            {room.occupation || "Any"}
                          </span>
                        </div>
                      </div>
              
                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <Link to={`/messages`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profilepage`);
                          }}
                          className="flex-1 bg-white border border-blue-100 hover:bg-blue-50 text-blue-600 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-sm"
                        >
                          <MessageCircle size={14} />
                          <span>Message</span>
                        </button>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/edit-listing/${room._id}`);
                          }}
                          className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-sm"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteListing(room._id);
                          }}
                          className="flex-1 bg-white border border-red-100 hover:bg-red-50 text-red-600 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-sm"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Profile Settings
              </h2>

              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h3 className="font-medium text-gray-700 mb-4">
                    Edit Profile
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        value={user.name}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </div>
                    <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
                      Save Changes
                    </button>
                  </form>
                </div>

                <div className="border-b pb-6">
                  <h3 className="font-medium text-gray-700 mb-4">
                    Change Password
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      />
                    </div>
                    <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
                      Update Password
                    </button>
                  </form>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-4">
                    Delete Account
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                  <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
