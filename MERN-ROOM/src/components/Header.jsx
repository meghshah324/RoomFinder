import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
   return (
      <header>

         <div className="flex justify-between items-center p-4 m-3">
            <a href="/" className="font-bold text-2xl">
               <span className="text-black">Room</span>
               <span className="text-green-500">Wise</span>
            </a>
            <div className="flex gap-4">
               <Link to="/rooms" >
                  <a
                     href="/find-room"
                     className="px-4 py-2 border-2  border-yellow-200  rounded-full hover:bg-yellow-200 hover:text-gray-700"
                  >
                     Find Room
                  </a>
               </Link>
               <Link to="/form/profile" >
                  <a
                     href="/"
                     className="px-4 py-2 border-none rounded-full  text-gray-600 hover:bg-yellow-200 transition duration-600"
                  >
                     Add Listing
                  </a>
               </Link>

               <Link to="/SignIn" >
                  <a
                     href="/login"
                     className="px-4 py-2 border-none rounded-full  text-gray-600 hover:bg-yellow-200 transition duration-600"
                  >
                     Login
                  </a>
               </Link>
            </div>
         </div>
      </header>
   );
}
