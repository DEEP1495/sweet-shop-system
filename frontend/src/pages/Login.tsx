import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // save token
      localStorage.setItem("token", res.data.token);

      setMessage("Login successful ✅");

      // redirect to dashboard
      navigate("/sweets");
    } catch (error: unknown) {
  if (error instanceof Error) {
    setMessage("Login failed");
  } else {
    setMessage("Login failed");
  }
}

  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
