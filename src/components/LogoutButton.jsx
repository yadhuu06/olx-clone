import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { user, logout } = useAuth();

  return user ? (
    <button onClick={logout}>Logout</button>
  ) : null;
};

export default LogoutButton;
