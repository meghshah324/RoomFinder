import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext.jsx";

function LifestyleForm() {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/listing/createlist", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      setFormData({
        location: "",
        rent: "",
        buildingType: "",
        roomType: "",
        genderLookingFor: "",
        amenities: [],
        description: "",
        cleanliness: "",
        foodPreference: "",
        smoker: "",
        partyHabit: "",
        overnightGuest: "",
        occupation: "",
      });
      navigate(`/form/profile3/${data.postId}`);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-xl font-bold text-gray-800 text-center">
          Lifestyle Preferences
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-medium">
            Cleanliness Level
          </label>
          <select
            name="cleanliness"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select</option>
            <option>Very Messy</option>
            <option>Messy</option>
            <option>Moderate</option>
            <option>Neat</option>
            <option>Very Clean</option>
          </select>

          <label className="block text-gray-700 font-medium">
            Food Preference
          </label>
          <select
            name="foodPreference"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select</option>
            <option>Vegetarian</option>
            <option>Non-Vegetarian</option>
            <option>Vegan</option>
            <option>Eggetarian</option>
          </select>

          <label className="block text-gray-700 font-medium">Smoker</label>
          <select
            name="smoker"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select</option>
            <option>Smoker</option>
            <option>Non-Smoker</option>
            <option>Occasionally</option>
          </select>

          <label className="block text-gray-700 font-medium">
            Party Habits
          </label>
          <select
            name="partyHabit"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select</option>
            <option>Frequent</option>
            <option>Occasional</option>
            <option>Rare</option>
            <option>Never</option>
          </select>

          <label className="block text-gray-700 font-medium">
            Overnight Guests
          </label>
          <select
            name="overnightGuest"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select</option>
            <option>Allowed</option>
            <option>Not Allowed</option>
            <option>Occasionally Allowed</option>
          </select>

          <label className="block text-gray-700 font-medium">Occupation</label>
          <select
            name="occupation"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select</option>
            <option>Student</option>
            <option>Working Professional</option>
            <option>Freelancer</option>
            <option>Other</option>
          </select>

          <div className="flex justify-between mt-4">
            <Link to="/form/profile">
              <button
                type="button"
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-purple-600"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LifestyleForm;
