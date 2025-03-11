import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import UsersDetailsPage from "./pages/UsersDetailsPage/UsersDetailsPage";
import './App.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage isHome={"true"}/>}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage/>} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
            <Route path="/admin" element={<AdminPage />}/>
            <Route path="/users" element={<UsersPage />}/>
            <Route path="/usersDetails" element={<UsersDetailsPage />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
