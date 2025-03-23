import React, { useState } from 'react';
import { AirVent, ParkingCircle, Refrigerator, Tv, WashingMachine, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';


function Profile() {
  const amenities = [
    { name: 'wifi', icon: <Wifi size={28} />, label: 'WiFi' },
    { name: 'ac', icon: <AirVent size={28} />, label: 'AC' },
    { name: 'tv', icon: <Tv size={28} />, label: 'TV' },
    { name: 'fridge', icon: <Refrigerator size={28} />, label: 'Fridge' },
    { name: 'washingMachine', icon: <WashingMachine size={28} />, label: 'Washing Machine' },
    { name: 'parking', icon: <ParkingCircle size={28} />, label: 'Parking' }
  ];

  const buildingTypeOpt = ["Apartment", "House", "PG"];
  const furnishedOpt = ["Furnished", "Semi-Furnished", "Un-Furnished"];
  const [selected, setSelected] = useState(null);
  const [selectedFurnished, setSelectedFurnished] = useState(null);
  const [selectAmenities, setSelectAmenities] = useState([]);
  const { formData, setFormData } = useFormContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected options:", selected);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClick = (index) => {
    setSelectAmenities((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  console.log(formData);




  return (
    <div className='bg-white min-h-screen flex flex-col items-center p-6'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl'>
        <h1 className='text-2xl font-bold text-blue text-center'>Add Your Room Details</h1>
        <h2 className='text-gray-600 text-center mb-4'>So others can connect with you</h2>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-6 p-4'>
              <label className='block text-gray-700 font-medium'>Add Your Location</label>
              <input
                type='text'
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder='Enter Your Location'
                className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400'
              />

              <label className='block text-gray-700 font-medium'>Enter Rent*</label>
              <input
                type='text'
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                placeholder='Enter Rent'
                className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400'
              />
            </div>

            <div className='space-y-6 p-4'>
              <div>
                <label className='font-medium text-gray-700'>Enter Building Type *</label>
                <div className='flex gap-2 mt-2'>
                  {buildingTypeOpt.map((buildingType, index) => (
                    <button
                      key={index}
                      type="button"
                      name={buildingType}
                      className={`px-4 py-2 border font-medium rounded-lg 
                        ${selected === index ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => {
                        setSelected(index);
                        setFormData((prev) => ({
                          ...prev,
                          buildingType: buildingType
                        }));
                      }}
                    >
                      {buildingType}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className='font-medium text-gray-700'>Furnished*</label>
                <div className='flex gap-2 mt-2'>
                  {
                    furnishedOpt.map((roomType, index) => (
                      <button
                        key={index}
                        type="button"
                        name={roomType}
                        className={`px-4 py-2 border font-medium rounded-lg 
                        ${selectedFurnished === index ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => {
                          setSelectedFurnished(index);
                          setFormData((prev) => ({
                            ...prev,
                            roomType: roomType
                          }));
                        }}
                      >
                        {roomType}
                      </button>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <label className='block text-gray-700 font-medium'>Preferred Gender</label>
            <div className='flex gap-2 mt-2'>
              {['Male', 'Female', 'Any'].map((gender, index) => (
                <button
                  key={index}
                  type="button"
                  className={`px-4 py-2 border font-medium rounded-lg 
          ${formData.genderLookingFor === gender ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      genderLookingFor: gender
                    }));
                  }}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className='text-xl font-bold text-gray-600'>Amenities</h2>
            <div className='grid grid-cols-3 gap-4 mt-4'>
              {amenities.map(({ name, icon, label }, index) => (
                <div key={name}
                  name={name}
                  onClick={() => {
                    handleClick(index);
                    setFormData((prev) => ({
                      ...prev,
                      amenities: prev.amenities
                        ? selectAmenities.includes(index)
                          ? prev.amenities.filter((i) => i !== name)
                          : [...prev.amenities, name]
                        : [name]
                    }));
                  }}
                  className={`flex justify-center items-center border p-2 rounded-lg cursor-pointer gap-4 
      ${selectAmenities.includes(index) ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <div>{icon}</div>
                  <label className='font-medium text-gray-700'>{label}</label>
                </div>
              ))}
            </div>

          </div>

          <div className='space-y-6'>
            <label className='block text-gray-700 font-medium'>Add Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter Description'
              className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400'
            ></textarea>
          </div>

          <Link to='/form/profile2'>
            <div className='flex justify-center mt-4'>
              <button type='button' className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>Next</button>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Profile;
