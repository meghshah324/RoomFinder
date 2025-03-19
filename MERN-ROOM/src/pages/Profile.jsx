import React from 'react'
import { AirVent, ParkingCircle, Refrigerator, Tv, WashingMachine, Wifi, } from 'lucide-react'
import LifestyleForm from '../components/LifestyleForm.jsx'

function Profile() {
  const amenities = [
    { name: 'wifi', icon: <Wifi size={28} />, label: 'WiFi' },
    { name: 'ac', icon: <AirVent size={28} />, label: 'AC' },
    { name: 'tv', icon: <Tv size={28} />, label: 'TV' },
    { name: 'fridge', icon: <Refrigerator size={28} />, label: 'Fridge' },
    { name: 'washingMachine', icon: <WashingMachine size={28} />, label: 'Washing Machine' },
    { name: 'parking', icon: <ParkingCircle size={28} />, label: 'Parking' }
  ]
  return (
    <>
      <div className='bg-white min-h-screen flex flex-col items-center p-6'>
        <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl'>
          <h1 className='text-2xl font-bold text-blue text-center'>Add Your Room Details</h1>
          <h2 className='text-gray-600 text-center mb-4'>so others can connect you</h2>
          <form className='space-y-4'>
            <div className='grid grid-cols-2 gap-6'>
              <div className='space-y-6 p-4'>
                <label className='block text-gray-700 font-medium'>Add Your Location</label>
                <input type='text' placeholder='Enter Your Location' className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400' />
                <label className='block text-gray-700 font-medium'>Enter Rent*</label>
                <input type='text' placeholder='Enter Rent' className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400' />
              </div>
              <div className='space-y-6 p-4'>
                <div >
                  <label className='font-medium text-gray-700' >Enter Building Type *</label>
                  <div className='flex gap-2 mt-2'>
                    <button className='px-4 py-2 border font-medium text-gray-700 rounded-lg hover:bg-gray-100'>Apartment</button>
                    <button className='px-4 py-2 border font-medium text-gray-700 rounded-lg hover:bg-gray-100'>House</button>
                    <button className='px-4 py-2  border font-medium text-gray-700 rounded-lg hover:bg-gray-100'>PG</button>
                  </div>
                </div>
                <div >
                  <label className='font-medium text-gray-700'>Furnished*</label>
                  <div className='flex gap-2 mt-2'>
                    <button className='px-4 py-2 border font-medium text-gray-700 rounded-lg hover:bg-gray-100'>Furnished</button>
                    <button className='px-4 py-2 border font-medium text-gray-700 rounded-lg hover:bg-gray-100'>Semi-furnished</button>
                    <button className='px-4 py-2  border font-medium text-gray-700 rounded-lg hover:bg-gray-100'>Un-Furnished</button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className='text-xl font-bold text-gray-600'>Amenities</h2>
              <div className='grid grid-cols-3 gap-4 mt-4'>
                {amenities.map(({ name, icon, label }) => (
                  <div className='flex justify-center items-center border p-2 rounded-lg cursor-pointer gap-4 hover:bg-gray-100'>
                    <div>{icon}</div>
                    <label className='font-medium text-gray-700'>{label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className='space-y-6'>
              <label className='block text-gray-700 font-medium'>Add Description</label>
              <textarea placeholder='Enter Description' className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400'></textarea>
            </div>
            <div className='flex justify-center mt-4'>
              <button type='button' className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>Next</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Profile