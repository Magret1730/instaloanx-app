import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<h1>Welcome to InstaloanX Application</h1>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
