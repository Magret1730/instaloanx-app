import { Routes, Route} from "react-router-dom";
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

    // Submit LinkedIn/CV feedback - Friday
    // Handle search input query on admin page // User Loan details page (1) - Friday
    // Handle apply loan -apply loan cant work if any loan status is active (2) - Saturday
    // Admin will get loan request and then change status to "active" (3) - Saturday
    // Handle loan repayment (4) - Sunday
    // Handle NavBar issue - Monday
    // Go back and restyle the whole pages especially error messages (Not full styling but something to soubmit) - Monday
    // Resetyle no loan history or no active loan styling. - Monday
    // Restyle userDetails page for tablet/desktop
    // use notification toastify to handle logout and the rest error/success message - Monday
    // Handle forgotPassword and resetPassword. (Do this first or the next) - Tuesday
    // Ensure all data are not exposed in backend return statements - Tuesday
    // Click to see passowrd feature - Tuesday
    // ReadMe/License/Submission/Make demo video for linkedin - Saturday
    // Presentation slides/Practise/Demo - Saturday
    // Deployment - Saturday/Sunday
    // Users loan history can be in its own component
    // Admin page: users details can be in its own conponent also

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

            <Route path="/usersDetails/:id" element={<UsersDetailsPage />} />

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
