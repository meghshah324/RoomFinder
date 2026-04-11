import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "./profileMenu";
import { useAuthContext } from "../context/AuthContext";
import { useFormContext } from "../context/FormContext";

export default function Header() {
  const { isLoggedIn } = useAuthContext();
  const { isFlowLocked } = useFormContext();
  const navigate = useNavigate();

  const handleLogoClick = (event) => {
    if (!isFlowLocked) return;

    event.preventDefault();
    navigate("/form/profile3");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-4">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="text-2xl font-bold text-gray-800"
          >
            <span>Room</span>
            <span className="text-green-600">Wise</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 sm:mt-0">
    
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
