import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Users from "./pages/Users/Users";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import './App.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home isHome={"true"}/>}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<Admin />}/>
            <Route path="/users" element={<Users />}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
