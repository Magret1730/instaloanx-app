import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Users from "./pages/Users/Users";
import './App.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/users" element={<Users />}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
