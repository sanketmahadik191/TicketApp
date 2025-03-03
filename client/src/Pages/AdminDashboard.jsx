import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slices/userSlice';
import { fetchTickets } from '../redux/slices/ticketSlice';


const AdminDashboard = () => {
  
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
   const { allTickets } = useSelector((state) => state.tickets);
  useEffect(() => {
    
    if (allTickets.length === 0 || users.length === 0) {
         dispatch(fetchUsers());
         dispatch(fetchTickets());
       }
     }, [dispatch]);

  return (
    <div className="flex min-h-[90vh]">
      <div className="w-64 p-5 fixed top-0 left-0 h-screen border-r-slate-300 border-2">
        <h2 className="text-xl font-bold mb-5">Company Name</h2>
        <ul className='mt-20'>
          <li className="mb-3"><Link to="tickets" className="hover:text-gray-300">Tickets</Link></li>
          <li><Link to="users" className="hover:text-gray-300">Users</Link></li>
        </ul>
      </div>
      <div className="flex-1 p-10 mt-16 ml-64">
        <Breadcrumb />
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link to='tickets'><div className="p-4 bg-blue-500 text-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Tickets</h3>
            <p className="text-2xl">{allTickets.length || '0'}</p>
            
          </div></Link>
         <Link to='users'> <div className="p-4 bg-green-500 text-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Customers</h3>
            <p className="text-2xl">{ users.length || "0"}</p>
            
          </div></Link>
        </div>
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminDashboard;
