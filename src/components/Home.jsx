import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();

  console.log("Current User:", user);  

  return (
    <div>
      <h1>Welcome to Home Page</h1>

      {user ? (  
        <button onClick={logout}>Logout</button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Home;
