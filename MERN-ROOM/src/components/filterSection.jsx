import React, { useState } from 'react';

const RoomFinder = () => {
  const [genderPreference, setGenderPreference] = useState('any');
  const [priceRange, setPriceRange] = useState(100000);
  const [location, setLocation] = useState('');

  const handleReset = () => {
    setGenderPreference('any');
    setPriceRange(100000);
    setLocation('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">RoomFinder</h1>
              </div>
              <div className="ml-6 flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2">Listings</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2">About</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2">Contact</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Sign In</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">List a Room</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h2 className="text-3xl font-bold mb-2">Find Your Perfect Room</h2>
        <p className="text-gray-600 mb-6">Use filters to find the perfect match for your needs</p>

        {/* Filters */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Gender Preference */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Gender Preference</label>
              <div className="flex space-x-4">
                {['Male', 'Female', 'Any'].map((gender) => (
                  <label key={gender} className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="gender"
                      value={gender.toLowerCase()}
                      checked={genderPreference === gender.toLowerCase()}
                      onChange={() => setGenderPreference(gender.toLowerCase())}
                    />
                    <span className="ml-2">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Price Range</label>
              <div className="flex items-center space-x-4">
                <span>₹0</span>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="flex-grow"
                />
                <span>₹{priceRange}</span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Location</label>
              <input
                type="text"
                placeholder="Search by location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Room Count */}
        <div className="mt-4 text-gray-600">
          Showing 6 of 6 rooms
        </div>
      </div>
    </div>
  );
};

export default RoomFinder;