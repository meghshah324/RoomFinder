import React, { useEffect, useState } from "react";
import { IndianRupee, MapPinned, Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/img1.jpeg";

const RoomFinder = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const [genderPreference, setGenderPreference] = useState("any");
  const [priceRange, setPriceRange] = useState(100000);
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/listing/rooms");
        if (!res.ok) throw new Error("Failed to fetch rooms");
        const data = await res.json();
        setRooms(data || []);
        setFilteredRooms(data || []);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const applyFilters = () => {
    const filtered = rooms.filter((room) => {
      const rentValue = parseInt(room.rent.replace(/,/g, ""));
      const matchesGender =
        genderPreference === "any" ||
        room.genderLookingFor?.toLowerCase() === genderPreference;
      const matchesRent = rentValue <= priceRange;
      const matchesLocation =
        location === "" ||
        room.location?.toLowerCase().includes(location.toLowerCase());
      const occupationValue =
        room.occupation || room.lifestyle?.occupation || "";
      const matchesOccupation =
        occupation === "" ||
        occupationValue.toLowerCase().includes(occupation.toLowerCase());

      return (
        matchesGender && matchesRent && matchesLocation && matchesOccupation
      );
    });

    setFilteredRooms(filtered);
  };

  const handleReset = () => {
    setGenderPreference("any");
    setPriceRange(100000);
    setLocation("");
    setOccupation("");
    setFilteredRooms(rooms);
  };

  return (
    <div className="bg-white rounded-xl m-4 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Available Roommates ({filteredRooms.length})
        </h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-green-600 hover:text-green-800"
        >
          {showFilters ? <X className="mr-2" /> : <Filter className="mr-2" />}
          {showFilters ? "Close Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Gender Preference */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Gender Preference
              </label>
              <div className="flex space-x-2">
                {["Male", "Female", "Any"].map((gender) => (
                  <label
                    key={gender}
                    className={`
                    flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-300
                    ${
                      genderPreference === gender.toLowerCase()
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                `}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      name="gender"
                      value={gender.toLowerCase()}
                      checked={genderPreference === gender.toLowerCase()}
                      onChange={() => setGenderPreference(gender.toLowerCase())}
                    />
                    <span className="font-medium">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Max Rent
              </label>
              <div className="flex items-center space-x-4">
                <span>₹0</span>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="flex-grow accent-green-600"
                />
                <span>₹{priceRange.toLocaleString()}</span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="Search by location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Occupation
              </label>
              <input
                type="text"
                placeholder="Search by occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleReset}
              className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md border"
            >
              Reset All
            </button>
            <button
              onClick={applyFilters}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {error && (
          <div className="col-span-full text-red-600 text-center">{error}</div>
        )}
        {filteredRooms.map((room) => (
          <div
            key={room._id}
            onClick={() => navigate(`/property/${room._id}`)}
            className="cursor-pointer bg-gray-50 shadow rounded-xl p-4 hover:shadow-md transition-transform duration-400 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-24 h-24 overflow-hidden rounded-lg mb-4 sm:mb-0">
                <div className="relative w-full h-full">
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}
                  <img
                    src={room?.photos?.[0]?.url || img1} 
                    alt={`Room by ${room?.postedBy?.username || "Unknown"}`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </div>
              </div>
              <div className="sm:ml-4 flex-1">
                <h2 className="text-lg font-semibold">
                  {room?.postedBy?.username || "Unknown User"}
                </h2>
                <div className="text-gray-600 flex items-center text-sm mt-1">
                  <MapPinned size={14} className="mr-1" />
                  <p>{room.location || "No location specified"}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 mt-4 text-sm ">
              <div className="flex flex-col items-start">
                <span className="text-gray-500 text-xs">Rent</span>
                <div className="flex items-center text-gray-800 font-semibold">
                  <IndianRupee size={14} className="mr-1" />
                  {room.rent?.toLocaleString() || "N/A"}
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-gray-500 text-xs">Looking for</span>
                <span className="font-semibold">
                  {room.genderLookingFor || "Not specified"}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-gray-500 text-xs">Occupation</span>
                <span className="font-semibold">
                  {room.occupation || "Not specified"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRooms.length === 0 && !error && (
        <div className="text-center text-gray-600 mt-8">
          No rooms found matching your filters.
        </div>
      )}
    </div>
  );
};

export default RoomFinder;
