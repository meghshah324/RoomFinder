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
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log('Login attempted with:', { username, password });
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
        
        <div className="mb-4">
          <label 
            htmlFor="username" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;