import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children}) => {
    const isAuthenticatedd = () => {
        const tokenResp = localStorage.getItem("token");
        
        return !!tokenResp; // converts to boolean
    }

    if (!isAuthenticatedd()) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the children (the protected component) if authenticated
    return children;
};

export default ProtectedRoute;