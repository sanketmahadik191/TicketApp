import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const result = await dispatch(loginUser({ email, password })).unwrap(); // Unwrap to handle response directly
        console.log("result",result.user._id);
        
        // Redirect based on user role
        if (result.role === "admin") {
            navigate("/admin-dashboard");
        } else if (result.role === "agent") {
            navigate("/agent-dashboard");
        } else {
            navigate(`/customer-dashboard/${result?.user?._id}`);
        }
    } catch (error) {
        console.error("Login failed:", error);
    }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500">{error.message}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mt-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4 rounded">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login