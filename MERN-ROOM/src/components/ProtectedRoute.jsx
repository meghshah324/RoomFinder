import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuthContext();
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white/90 p-8 shadow-xl backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
              <div className="absolute h-16 w-16 rounded-2xl border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
              <div className="h-6 w-6 rounded-full bg-emerald-600" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Checking your access</h2>
            <p className="mt-2 text-sm text-gray-600">
              Preparing your account and protected pages.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            <div className="h-3 w-full animate-pulse rounded-full bg-gray-200" />
            <div className="h-3 w-5/6 animate-pulse rounded-full bg-gray-200" />
            <div className="h-3 w-4/6 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }
  return !isLoggedIn ? <Navigate to="/signin" /> : children;
};
export default ProtectedRoute;
