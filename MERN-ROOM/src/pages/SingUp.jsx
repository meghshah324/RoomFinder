import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import AlertMessage from "../components/Alert";

export default function SignUp() {
  const { refreshUser, handleLogin, handleLogout } = useAuthContext();
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prevState) => ({
      ...prevState,
      gender,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await result.json();
      console.log("Response Data:", data);

      if (data.success == false) {
        setLoading(false);
        handleLogout();
        setError(data.messsage || "Operation failed.");
        return;
      } else {
        handleLogin();
        refreshUser();
      }
      setFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
        city: "",
      });
      console.log(formData);
      setError(null);
      setLoading(false);
      setAlert({
        type: "success",
        message: "Registration successful! Redirecting to login...",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error during form submission:", error);
      setLoading(false);
      setAlert({
        type: "error",
        message: "Something went wrong. Please try again.",
        autoClose: 5000,
      });
      setError(error.message || "A network error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          <span className="text-black">Room</span>
          <span className="text-green-500">Wise</span>
        </h1>
      </div>

      <div className="w-full max-w-3xl bg-white border-2 rounded-lg p-10">
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
          You are Almost Done!
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Please fill below details to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              id: "username",
              label: "Your Name*",
              type: "text",
              placeholder: "Please enter your name",
            },
            {
              id: "email",
              label: "Your Email*",
              type: "email",
              placeholder: "Please enter your email",
            },
            {
              id: "password",
              label: "Your Password*",
              type: "password",
              placeholder: "Please enter your password",
            },
          ].map((field) => (
            <div
              key={field.id}
              className="flex flex-col sm:flex-row items-start sm:items-center"
            >
              <label
                htmlFor={field.id}
                className="block text-gray-700 font-medium mb-2 sm:mb-0 sm:w-1/3"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="border border-gray-300 rounded-lg p-3 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}

          {/* Gender selection */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="block text-gray-700 font-medium mb-2 sm:mb-0 sm:w-1/3">
              Your Gender*
            </label>
            <div className="flex space-x-4 w-full sm:w-2/3">
              {["Male", "Female"].map((gender) => (
                <button
                  type="button"
                  key={gender}
                  onClick={() => handleGenderSelect(gender)}
                  className={`py-2 px-4 rounded-lg border border-gray-300 w-1/2 ${
                    formData.gender === gender
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* City selection */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="block text-gray-700 font-medium mb-2 sm:mb-0 sm:w-1/3">
              Please select the city*
            </label>
            <select
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select City</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>

          {/* Submit button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-2/3 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-75"
            >
              {loading ? "Loading..." : "Register"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>

        {/* Already have an account? */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="text-green-500 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
        <div className="fixed inset-0 z-50 pointer-events-none">
          {alert && (
            <AlertMessage
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
              autoClose={alert.autoClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
