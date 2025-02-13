import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevents flickering on refresh

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔥 Auth State Changed:", currentUser);
      setUser(currentUser);
      setLoading(false); // Stop loading after authentication check
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ User Signed Up Successfully", userCredential.user);
      return userCredential.user; // Return the user for further actions
    } catch (error) {
      console.error("❌ Signup Error:", error.message);
      throw new Error(error.message); // Return error for UI feedback
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ User Logged In Successfully", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("👋 User Logged Out");
      setUser(null);
    } catch (error) {
      console.error("❌ Logout Error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout, loading }}>
      {!loading && children} {/* Prevents flashing UI before auth check */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
