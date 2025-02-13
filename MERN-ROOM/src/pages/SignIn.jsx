import React from 'react';
import signbg from '../images/signbg.jpg';

export default function SignIn() {
  return (
    <div className='container flex items-center justify-center h-screen overflow-hidden'>
      <div className="w-1/2 mt-0">
        <img src={signbg} alt="Sign In Background" className="object-cover h-full" />
      </div>
      <div className="w-full md:w-1/2 p-8 h-screen flex flex-col justify-center items-start">
        <a href="/" className="font-bold text-3xl mb-8">
          <span className="text-black">Room</span>
          <span className="text-green-500">Wise</span>
        </a>

        <h3 className="font-medium text-3xl text-gray-700 mt-4">
          Enter Mobile Number
        </h3>
        <p className="mt-2 mb-8 text-sm text-gray-500 w-2/3">
          We will send an SMS with a 5-digit verification code on this number.
        </p>

        <form className="w-full">
          <input
            type="text"
            placeholder="9999 999 999"
            className="border-2 border-gray-300 p-3 rounded-full w-full md:w-2/3 mb-6"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white hover:bg-gray-500 py-3 w-full md:w-2/3 rounded-full"
          >
            Get OTP
          </button>
        </form>
      </div>

    </div>
  );
}
