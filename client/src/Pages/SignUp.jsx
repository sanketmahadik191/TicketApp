import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../redux/slices/authSlice';

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);


    const handleSignup = (e) => {
        e.preventDefault();

        dispatch(signupUser({ name: fullName, email, password, role }))
            .unwrap() // Unwrap ensures we can directly handle success/failure
            .then(() => {
                navigate("/login"); // Redirect on success
            })
            .catch((error) => {
                console.error("Signup failed:", error);
            });
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center">Signup</h2>
                {error && <p className="text-red-500">{error.message}</p>}
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-2 border rounded mt-4"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
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
                    <select className="w-full p-2 border rounded mt-4" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="customer">Customer</option>
                        <option value="agent">Agent</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4 rounded">
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already signed up?{" "}
                    <Link to="/login" className="text-blue-500">Go to Login</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp