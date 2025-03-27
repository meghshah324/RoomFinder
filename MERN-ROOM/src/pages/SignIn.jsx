// import React from 'react';
// import signbg from '../images/signbg.jpg';

// export default function SignIn() {
//   return (
//     <div className='container flex items-center justify-center h-screen overflow-hidden'>
//       <div className="w-1/2 mt-0">
//         <img src={signbg} alt="Sign In Background" className="object-cover h-full" />
//       </div>
//       <div className="w-full md:w-1/2 p-8 h-screen flex flex-col justify-center items-start">
//         <a href="/" className="font-bold text-3xl mb-8">
//           <span className="text-black">Room</span>
//           <span className="text-green-500">Wise</span>
//         </a>

//         <h3 className="font-medium text-3xl text-gray-700 mt-4">
//           Enter Mobile Number
//         </h3>
//         <p className="mt-2 mb-8 text-sm text-gray-500 w-2/3">
//           We will send an SMS with a 5-digit verification code on this number.
//         </p>

//         <form className="w-full">
//           <input
//             type="text"
//             placeholder="9999 999 999"
//             className="border-2 border-gray-300 p-3 rounded-full w-full md:w-2/3 mb-6"
//           />
//           <button
//             type="submit"
//             className="bg-gray-800 text-white hover:bg-gray-500 py-3 w-full md:w-2/3 rounded-full"
//           >
//             Get OTP
//           </button>
//         </form>
//       </div>

//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Response loginStatus:", data);

      if (!res.ok || data.success === false) {
        setErrorMsg(data.message || "Invalid login credentials");
        return;
      }

      setErrorMsg("");
      navigate("/");
    } catch (error) {
      console.log("Error during login:", error);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        {errorMsg && (
          <p className="text-red-500 text-center mb-4">{errorMsg}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
        >
          Login
        </button>
    
        <p className="mt-4 text-sm text-gray-600 text-center">
          Dont't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-green-500 font-semibold hover:underline"
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
