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
import HelpPage from "./pages/HelpPage/HelpPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import RepayLoanPage from "./pages/RepayLoanPage/RepayLoanPage";

function App() {
    const isAuthenticated = () => {
        const tokenResp = localStorage.getItem("token");
        // console.log(tokenResp);
        
        return !!tokenResp;
    }

    const showToast = (type, message) => {
        if (type === "success") {
            toast.success(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else if (type === "error") {
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <>
        <Routes>
            <Route path="/" element={ <HomePage isAuthenticated={isAuthenticated} /> }/>
            <Route path="/help" element={ <HelpPage /> } />
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage/>} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />

            {/* <Route path="/admin/:id" element={ */}
            <Route path="/admin" element={
                <AdminProtectedRoute>
                    <AdminPage />
                </AdminProtectedRoute>
            }/>

            {/* <Route path="/users/:id"  element={ */}
            <Route path="/dashboard"  element={
                <ProtectedRoute >
                    <UsersPage isAuthenticated={isAuthenticated}/>
                </ProtectedRoute>
            }/>

            {/* <Route path="/usersDetails/:id" element={<UsersDetailsPage />} /> */}
            <Route path="/usersDetails" element={<UsersDetailsPage />} />

            <Route path="/loanForm" element={
                <ProtectedRoute>
                    <LoanFormPage />
                </ProtectedRoute>
            }/>

            <Route path="/repayLoan" element={
                <ProtectedRoute>
                    <RepayLoanPage />
                </ProtectedRoute>
            }/>

            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>

        {/* ToastContainer to render toasts notifications */}
        <ToastContainer />
        </>
    )
}

export default App;
