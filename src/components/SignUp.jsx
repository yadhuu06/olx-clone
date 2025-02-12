import { useState } from "react";
import { useAuth } from "../context/AuthContext";  // ✅ Import useAuth

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();  // ✅ Get signUp from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(email, password);  // ✅ Call signUp function
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
