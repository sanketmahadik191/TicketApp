import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../redux/slices/userSlice';
import { fetchCustomerTickets, resetCustomerTickets } from '../redux/slices/ticketSlice';
import moment from 'moment';


const UserInfo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { userInfo, loading: userLoading, error: userError } = useSelector((state) => state.users);
    const { customerTickets, loading: ticketsLoading } = useSelector((state) => state.tickets);
    console.log(customerTickets);

    useEffect(() => {
        if (id) {
            dispatch(resetCustomerTickets()); // Reset previous tickets
            dispatch(fetchUserById(id));
            dispatch(fetchCustomerTickets(id));
        }
    }, [dispatch, id]);

    return (
        <div className="p-5 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            {userLoading ? (
                <p>Loading user details...</p>
            ) : userError ? (
                <p className="text-red-500">Error fetching user details</p>
            ) : userInfo ? (
                <div className="mb-6 p-4 border rounded bg-gray-100">
                    <p><strong>ID:</strong> {userInfo._id}</p>
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                </div>
            ) : null}

            <h2 className="text-xl font-bold mb-4">Customer Tickets</h2>
            {ticketsLoading ? (
                <p>Loading tickets...</p>
            ) : customerTickets.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">Ticket ID</th>
                                <th className="border px-4 py-2">Title</th>
                                <th className="border px-4 py-2">Created At</th>
                                <th className="border px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerTickets.map((ticket) => (
                                <tr key={ticket._id} className="border text-center">
                                    <td className="border px-4 py-2">{ticket._id}</td>
                                    <td className="border px-4 py-2">{ticket.title}</td>
                                    <td className="border px-4 py-2">{moment(ticket.createdAt).format('MMM D, YYYY HH:mm')}</td>
                                    <td className="border px-4 py-2">{ticket.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No tickets found for this user.</p>
            )}
        </div>
    );
};

export default UserInfo;
