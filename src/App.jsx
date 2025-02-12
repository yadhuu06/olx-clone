import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import LogoutButton from "./components/LogoutButton";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div>
        <h1>OLX Clone</h1>
        <LogoutButton />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
