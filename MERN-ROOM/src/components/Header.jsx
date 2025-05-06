import React from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./profileMenu";
import { useAuthContext } from "../context/AuthContext";

export default function Header() {
  const { isLoggedIn } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold">
              <span className="text-gray-800">Room</span>
              <span className="text-green-600">Wise</span>
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/rooms"
              className="px-4 py-2 text-sm font-medium rounded-full border border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
            >
              Find Room
            </Link>

            <Link
              to="/form/profile"
              className="px-4 py-2 text-sm font-medium rounded-full bg-yellow-100 hover:bg-yellow-200 text-gray-800 transition-colors"
            >
              Add Listing
            </Link>

            {/* Conditional rendering based on auth */}
            {isLoggedIn ? (
              <ProfileMenu />
            ) : (
              <Link
                to="/SignIn"
                className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}