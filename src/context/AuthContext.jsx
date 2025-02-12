import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();  // ✅ Create the AuthContext

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔥 Auth State Changed:", currentUser);  // ✅ Debugging user state
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fix: Ensure signUp function is correctly defined
  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ User Signed Up Successfully");
    } catch (error) {
      console.error("❌ Signup Error:", error.message);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    await signOut(auth);
    console.log("👋 User Logged Out");
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Fix: Make sure useAuth is exported properly
export const useAuth = () => {
  return useContext(AuthContext);
};
