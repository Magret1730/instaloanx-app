import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Loans from "./pages/Loans/Loans";
import './App.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/loans" element={<Loans />}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
