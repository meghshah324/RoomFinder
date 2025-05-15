import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import AlertMessage from "../components/Alert.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { refreshUser, handleLogin, handleLogout } = useAuthContext();
  const [alert, setAlert] = useState(null);

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

      if (!res.ok || data.success === false) {
        setErrorMsg(data.message || "Invalid login credentials");
        handleLogout();
        return;
      } else {
        handleLogin();
        refreshUser();
      }
      setErrorMsg("");
      setAlert({
        type: "success",
        message: "Login successful!",
        autoClose: 3000,
      });
      console.log("Current alert state:", alert);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.log("Error during login:", error);
      setErrorMsg("Something went wrong. Please try again.");
      setAlert({
        type: "error",
        message: "Something went wrong. Please try again.",
        autoClose: 5000,
      });
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
        </p>
      </form>
    </div>
  );
};

export default Login;
