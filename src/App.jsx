import { Routes, Route, Navigate } from "react-router-dom";
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
import AdminProtectedRoute from "./components/AdminProtectedRoute/AdminProtectedRoute";

function App() {
    const isAuthenticated = () => {
        const tokenResp = localStorage.getItem("token");
        
        return !!tokenResp;
    }

    // use notification toastify to handle logout and the rest error/success message
    // Handle admin page // search query on admin page // Loan details page (1)
    // Handle NavBar issue
    // Handle apply loan -apply loan cant work if any loan status is active (2)
    // Handle loan repayment (4)
    // Handle forgotPassword and resetPassword. (Do this first or the next)
    // Go back and restyle the whole pages especially error messages
    // Ensure all data are not exposed in backend return statements
    // Click to see passowrd feature
    // Resetyle no loan history or no active loan styling.
    // Users loan history can be in its own component
    // Admin page: users details can be in its own conponent also
    // Admin will get loan request and then change status to "active" (3)
    return (
        <>
        <Routes>
            <Route path="/" element={ <HomePage isAuthenticated={isAuthenticated} /> }/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage/>} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />

            <Route path="/admin" element={
                <AdminProtectedRoute>
                    <AdminPage isAuthenticated={isAuthenticated} />
                </AdminProtectedRoute>
            }/>

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
