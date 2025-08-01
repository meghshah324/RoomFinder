import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Save, 
  AlertTriangle, 
  Check, 
  Shield, 
  UserCircle, 
  LogOut,
  Camera
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { userId, userName, email } = useAuthContext();
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    name: userName || "",
    email: email || "",
    userId,
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success" // success or error
  });
  
  const [activeTab, setActiveTab] = useState("profile");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Data:", user);
    try {
      const res = await fetch(`http://localhost:3000/api/auth/edit-profile/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.name,
          email: user.email,
        }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update profile");
      
      setNotification({
        show: true,
        message: "Profile updated successfully",
        type: "success"
      });
      
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "success" });
      }, 3000);
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setNotification({
        show: true,
        message: "Failed to update profile",
        type: "error"
      });
      
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "error" });
      }, 3000);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
  
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({
        show: true,
        message: "New passwords don't match",
        type: "error"
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "error" }), 3000);
      return;
    }
  
    try {  
      const response = await fetch(`/api/auth/edit-password/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to update password");
      }
  
      setNotification({
        show: true,
        message: data.message,
        type: "success"
      });
  
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
  
    } catch (error) {
      setNotification({
        show: true,
        message: error.message,
        type: "error"
      });
    } finally {
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
    }
  };
  

  const handleDeleteAccount = async () => {
    // Create a modal confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/auth/delete-account/${userId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to delete account");
        
        navigate("/");
      } catch (error) {
        console.error("Error deleting account:", error);
        setNotification({
          show: true,
          message: "Failed to delete account",
          type: "error"
        });
        
        setTimeout(() => {
          setNotification({ show: false, message: "", type: "error" });
        }, 3000);
      }
    }
  };
  
  // Toggle function for password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
   <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {notification.show && (
        <div className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 py-2 px-4 sm:py-3 sm:px-5 rounded-lg shadow-lg flex items-center ${
          notification.type === "success" ? "bg-green-50 border-l-4 border-green-500" : "bg-red-50 border-l-4 border-red-500"
        }`}>
          {notification.type === "success" ? (
            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2" />
          ) : (
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2" />
          )}
          <p className={`text-xs sm:text-sm font-medium ${
            notification.type === "success" ? "text-green-700" : "text-red-700"
          }`}>
            {notification.message}
          </p>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md sm:shadow-xl rounded-lg sm:rounded-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-green-600 to-green-500 py-6 px-6 sm:py-8 sm:px-8 text-white">
            <h1 className="text-xl sm:text-2xl font-bold">Account Settings</h1>
            <p className="text-green-100 text-sm sm:text-base mt-1">Manage your profile information and account preferences</p>
          </div>
          
          <div className="flex flex-col sm:flex-row border-b overflow-x-auto">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex items-center py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap ${
                activeTab === "profile" 
                  ? "border-b-2 border-green-500 text-green-600 font-medium" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <UserCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="text-sm sm:text-base">Profile Information</span>
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`flex items-center py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap ${
                activeTab === "security" 
                  ? "border-b-2 border-green-500 text-green-600 font-medium" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="text-sm sm:text-base">Security</span>
            </button>
            <button 
              onClick={() => setActiveTab("danger")}
              className={`flex items-center py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap ${
                activeTab === "danger" 
                  ? "border-b-2 border-red-500 text-red-600 font-medium" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="text-sm sm:text-base">Danger Zone</span>
            </button>
          </div>
          
          <div className="p-4 sm:p-6 md:p-8">
            {activeTab === "profile" && (
              <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col items-center sm:flex-row sm:items-start">
                  <div className="relative group mb-4 sm:mb-0 sm:mr-6 md:mr-8">
                    <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                      <UserCircle className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                      <button className="bg-white p-1.5 sm:p-2 rounded-full shadow-md">
                        <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Profile Information</h2>
                    <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <div className="relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm sm:text-base"
                              value={user.name}
                              onChange={(e) => setUser({ ...user, name: e.target.value })}
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <div className="relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm sm:text-base"
                              value={user.email}
                              onChange={(e) => setUser({ ...user, email: e.target.value })}
                              placeholder="name@example.com"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center bg-green-600 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-green-700 transition-colors shadow-md text-sm sm:text-base"
                        >
                          <Save className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "security" && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Security Settings</h2>
                
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex items-start">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800 text-sm sm:text-base">Protect your account</h4>
                    <p className="text-xs sm:text-sm text-green-700 mt-1">Strong passwords help keep your account secure.</p>
                  </div>
                </div>
                
                <form className="space-y-4 sm:space-y-6" onSubmit={handlePasswordSubmit}>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword.current ? "text" : "password"}
                          className="block w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm sm:text-base"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          placeholder="Enter current password"
                          required
                        />
                        <button 
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility("current")}
                        >
                          {showPassword.current ? (
                            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword.new ? "text" : "password"}
                          className="block w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm sm:text-base"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          placeholder="Enter new password"
                          required
                        />
                        <button 
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility("new")}
                        >
                          {showPassword.new ? (
                            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword.confirm ? "text" : "password"}
                          className="block w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm sm:text-base"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          placeholder="Confirm new password"
                          required
                        />
                        <button 
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility("confirm")}
                        >
                          {showPassword.confirm ? (
                            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center bg-green-600 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-green-700 transition-colors shadow-md text-sm sm:text-base"
                    >
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === "danger" && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Danger Zone</h2>
                
                <div className="bg-red-50 rounded-lg p-4 sm:p-6 border border-red-100">
                  <h3 className="font-medium text-red-800 text-base sm:text-lg mb-2">Delete Account</h3>
                  <p className="text-red-700 text-xs sm:text-sm mb-4 sm:mb-6">
                    Once you delete your account, all of your data will be permanently removed from our servers. This action cannot be undone.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                    <button
                      onClick={() => navigate("/")}
                      className="inline-flex items-center bg-gray-100 text-gray-700 py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
                    >
                      <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      Log Out Instead
                    </button>
                    
                    <button
                      onClick={handleDeleteAccount}
                      className="inline-flex items-center bg-white border border-red-300 text-red-600 py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-red-50 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
                    >
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;