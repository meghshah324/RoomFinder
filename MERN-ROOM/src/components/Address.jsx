import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext.jsx';

const AddressForm = () => {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    address: {
      ...prev.address,
      [name]: value,
    },
  }));
};


  const handlePrevious = () => {
    navigate('/form/profile'); 
  };

  const handleNext = () => {
    navigate('/form/profile2');
  };

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[50%] mx-auto bg-white p-8 rounded-2xl space-y-8 m-10 ">
      <h2 className="text-3xl font-bold text-gray-700 text-center">Enter Room Address</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={formData.street}
          onChange={handleChange}
          className="w-full p-4 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="landmark"
          placeholder="Landmark (optional)"
          value={formData.landmark}
          onChange={handleChange}
          className="w-full p-4 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-4 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="w-full p-4 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          className="w-full p-4 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-4 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          className="px-6 py-3 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
