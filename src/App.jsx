import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import UsersDetailsPage from "./pages/UsersDetailsPage/UsersDetailsPage";
import './App.scss';
import LoanFormPage from "./pages/LoanFormPage/LoanFormPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Logout from "./components/Logout/Logout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";


function App() {
    const isAuthenticated = () => {
        const tokenResp = localStorage.getItem("token");
        
        return !!tokenResp;
    }

    // Handle * routes
    // Handle admin page and routes
    // Handle NavBar issue
    // Handle apply loan
    // Handle loan repayment
    // Handle forgotPassword and resetPassword
    // Go back and restyle the whole pages especially error messages
    return (
        <>
        <Routes>
            <Route path="/" element={ <HomePage isAuthenticated={isAuthenticated} /> }/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage/>} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
            <Route path="/admin" element={<AdminPage />}/>

            <Route path="/users"  element={
                <ProtectedRoute >
                    <UsersPage isAuthenticated={isAuthenticated}/>
                </ProtectedRoute>
            }/>

            <Route path="/usersDetails" element={<UsersDetailsPage />} />

            <Route path="/loanForm" element={
                <ProtectedRoute>
                    <LoanFormPage />
                </ProtectedRoute>
            }/>

            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
        </>
    )
}

export default App;
