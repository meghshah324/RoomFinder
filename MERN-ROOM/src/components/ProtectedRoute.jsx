import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


const ProtectedRoute = ({ children}) => {
    const { isLoggedIn, loading } = useAuthContext();
    if (loading) {
        return <div>Loading...</div>; 
    }
    return !isLoggedIn  ? <Navigate to="/signin"/> : children;

}
export default ProtectedRoute;