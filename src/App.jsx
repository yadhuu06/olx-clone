import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import LogoutButton from "./components/LogoutButton";
import Home from "./components/Home";
import PostAd from "./components/PostAd";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Router>

      <nav className="bg-white shadow-md p-4 flex justify-between items-center">

        <Link to="/" className="text-3xl font-bold text-blue-600">
          OLX
        </Link>




        <div className="space-x-4">
          {user ? (
            <>
              <LogoutButton />
              <Link to="/post-ad">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Post Ad
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">Login</button>
              </Link>
              <Link to="/signup">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/post-ad"
          element={
            <ProtectedRoute>
              <PostAd />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
