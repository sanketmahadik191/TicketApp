import React from 'react'
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to Ticket App</h1>
          <p className="text-lg text-gray-600 mb-6">
            A simple and efficient ticket management system for admins, agents, and customers.
          </p>
          <div className="flex gap-4">
            <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Sign Up
            </Link>
          </div>
        </div>
      );
}

export default Home