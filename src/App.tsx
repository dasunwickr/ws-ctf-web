// src/MainApp.tsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebShop from "./components/web-shop";
import WebSecurityAcademy from "./components/combinedUI";
import { Login } from "./components/login";
import Lab from "./components/web-security-lab";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<WebShop />} />
        <Route path="/" element={<Lab />} />
        <Route path="/sliit-sick" element={<WebSecurityAcademy />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
