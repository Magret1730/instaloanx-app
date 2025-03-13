import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = ({ children }) => {
    // Function to check if the user is authenticated
    const isAuthenticated = () => {
        const token = localStorage.getItem("token");
        return !!token; // Converts to boolean
    };

    // Function to check if the user is an admin
    const isAdmin = () => {
        const token = localStorage.getItem("token");
        if (!token) return false;

        try {
            const decoded = jwtDecode(token); // Decodes the token
            return decoded.is_admin === true; // Check if the user is an admin
        } catch (err) {
            console.error("Error decoding token:", err);
            return false;
        }
    };

    // Redirect logic
    if (!isAuthenticated()) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin()) {
        // Redirect to home page if not an admin
        return <Navigate to="/" replace />;
    }

    // Renders the children i.e (the protected component) if authenticated and admin
    return children;
};

export default AdminProtectedRoute;