import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, Inbox, HelpCircle, LogOut, HomeIcon } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
function ProfileMenu() {

  const { refreshUser , handleLogout } = useAuthContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  

  const handleLogoutOpr = async () => {
    try {
      const res = await fetch("api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setIsOpen(false);
        refreshUser();
        handleLogout();
      } 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }; 
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "My Profile", icon: <User size={16} />, path: "/profile" },
    { label: "My Listings", icon: <HomeIcon size={16} />, path: "/my-listings" },
    { label: "Inbox", icon: <Inbox size={16} />, path: "/chat" },
    { label: "Help", icon: <HelpCircle size={16} />, path: "/help" },
  ];
  

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full "
      >
        <img
          alt="Profile"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
          className="inline-block h-10 w-10 cursor-pointer rounded-full object-cover object-center ring-2 ring-white hover:ring-green-400 transition-all duration-200"
        />
      </button>
      {isOpen && (
        <ul
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 z-10 mt-2 min-w-[180px] origin-top-right overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <button
                role="menuitem"
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}          
                className="flex w-full items-center rounded-md p-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                <span className="mr-2 flex h-5 w-5 items-center justify-center text-gray-500">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}

          <hr className="my-1 border-gray-200" aria-hidden="true" />
          <li>
            <button
              role="menuitem"
              onClick={handleLogoutOpr}
              className="flex w-full items-center rounded-md p-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            >
              <span className="mr-2 flex h-5 w-5 items-center justify-center text-gray-500">
                <LogOut size={16} />
              </span>
              <span className="font-medium">Log Out</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileMenu;