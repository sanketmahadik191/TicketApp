import React, { useEffect, useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTicket, fetchCustomerTickets } from "../redux/slices/ticketSlice";
import moment from "moment";

const CustomerDashboard = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: "", description: "" });

  const dispatch = useDispatch();
  const { id } = useParams();
  const { customerTickets, loading, error } = useSelector((state) => state.tickets);

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerTickets(id));
    }
  }, [dispatch, id]);
  const openModal = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewTicket({ title: "", description: "" });
  };

  const handleCreateTicket = () => {
    if (newTicket.title.trim() && newTicket.description.trim()) {
      dispatch(createTicket({ title: newTicket.title, notes: newTicket.description, customerId: id }))
        .then(() => dispatch(fetchCustomerTickets(id))); // Refresh tickets list
    }
    closeCreateModal();
  };
  return (
    <div className="p-10">
      <Breadcrumb />

      <div className="flex justify-between items-center my-8">
        <h1 className="text-2xl font-bold">Customer</h1>
        <div className="space-x-4">
          <button className="btn btn-primary" onClick={openCreateModal}>+ Create Ticket</button>

        </div>
      </div>
      {loading && <p>Loading tickets...</p>}
      {/* {error && <p className="text-red-500">{error?.message}</p>} */}

      <div className="overflow-x-auto">
        <table className="table  w-full border-collapse border border-gray-300">
          <thead>
            <tr className="text-center">
              <th className="border border-gray-300 p-2 ">Ticket ID</th>
              <th className="border border-gray-300 p-2 ">Title</th>
              <th className="border border-gray-300 p-2 ">Status</th>
              <th className="border border-gray-300 p-2 ">Updated On</th>
              <th className="border border-gray-300 p-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerTickets && customerTickets.map((ticket) => (
              <tr key={ticket._id} className="border-b border-gray-300 text-center">
                <td className="border border-gray-300 p-2">{ticket._id}</td>
                <td className="border border-gray-300 p-2">{ticket.title}</td>
                <td
                  className={`font-semibold border border-gray-300 p-2 ${ticket.status === "Active"
                    ? "text-green-500"
                    : ticket.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                    }`}
                >
                  {ticket.status}
                </td>

                {/* <td>{ticket.updatedOn}</td> */}
                <td className="border border-gray-300 p-2">{moment(ticket.createdAt).format('MMM D, YYYY HH:mm')}</td>
                <td className="border border-gray-300 p-2">
                  <button className="btn btn-info" onClick={() => openModal(ticket)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Ticket Details</h2>
            <table className="w-full border border-gray-300">
              <tbody>
                <tr className="border border-gray-300">
                  <td className="font-semibold p-3 capitalize border-r border-gray-300 bg-gray-100">Ticket ID:</td>
                  <td className="p-3">{selectedTicket._id || "-"}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="font-semibold p-3 capitalize border-r border-gray-300 bg-gray-100">Created Date:</td>            <td className="p-3">{moment(selectedTicket.createdAt).format('MMM D, YYYY HH:mm') || "-"}</td>

                </tr>
                <tr className="border border-gray-300">
                  <td className="font-semibold p-3 capitalize border-r border-gray-300 bg-gray-100">Status:</td>
                  <td className="p-3">{selectedTicket.status || "-"}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="font-semibold p-3 capitalize border-r border-gray-300 bg-gray-100">Description:</td>
                  <td className="p-3">{selectedTicket.notes || "-"}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="font-semibold p-3 capitalize border-r border-gray-300 bg-gray-100">Closure Remark:</td>
                  <td className="p-3">{selectedTicket.remark || "-"}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="font-semibold p-3 capitalize border-r border-gray-300 bg-gray-100">Closure Date:</td>
                  <td className="p-3">{moment(selectedTicket.updatedAt).format('MMM D, YYYY HH:mm') || "-"}</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-danger mt-4 w-full" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button className="absolute top-2 right-2 text-gray-600" onClick={closeCreateModal}>
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Create Ticket</h2>
            <div>
              <label className="block font-semibold mb-1">Title:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="block font-semibold mb-1">Description:</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              ></textarea>
            </div>
            <button className="btn btn-primary mt-4 w-full" onClick={handleCreateTicket}>
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
