import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>You are logged in 🎉</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
