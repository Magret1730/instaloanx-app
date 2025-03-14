import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        if (decoded.is_admin) {
            return children;
        } else {
            return <Navigate to="/users" replace />;
        }
    } catch (err) {
        console.error("Invalid token:", err);
        return <Navigate to="/login" replace />;
    }
};

export default AdminProtectedRoute;
