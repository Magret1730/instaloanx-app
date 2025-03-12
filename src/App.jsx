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


function App() {
  // const navigate = useNavigate();

  const isAuthenticated = () => {
    const tokenResp = localStorage.getItem("token");

    console.log(tokenResp);
    
    return !!tokenResp; // converts to boolean
  }

  // isAuthenticated();

  return (
    <>
      {/* <BrowserRouter> */}
        <Routes>
            <Route path="/" element={<HomePage isHome={"true"} isAuthenticated={isAuthenticated} />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage/>} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
            <Route path="/admin" element={<AdminPage />}/>
            <Route path="/users" element={<UsersPage />}/>
            <Route path="/usersDetails" element={<UsersDetailsPage />} />
            <Route path="/loanForm" element={<LoanFormPage />} />
        </Routes>
    {/* </BrowserRouter> */}
    </>
  )
}

export default App;
