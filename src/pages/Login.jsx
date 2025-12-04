import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import api from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username && !password) {
      setStatusMsg("❌ Please fill in all fields");
      return;
    }
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });
      const { token } = res.data || {};
      if (!token) {
        setStatusMsg("❌ Login failed");
        return;
      }
      login(token);
      setStatusMsg("✔️ Login successful");
      navigate("/dashboard/sedi");
    } catch (err) {
      console.error(err);
      setStatusMsg("❌ Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-sm border">
        <h1 className="text-3xl font-bold text-blue-900 text-center mb-6 tracking-tight">GDPAC Admin Login</h1>
        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block text-blue-800 mb-1" htmlFor="username">Username or Email</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="e.g. admin@gdpac.ng"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-blue-800 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white font-semibold rounded-lg shadow-sm transition-all duration-200"
          >
            Sign In
          </button>
        </form>
        {statusMsg && (
          <div className="mt-4 text-sm text-center " style={{ color: statusMsg.startsWith("✔️") ? "#22c55e" : "#dc2626" }}>{statusMsg}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
