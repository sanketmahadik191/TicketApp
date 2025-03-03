import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, updateTicket } from '../redux/slices/ticketSlice';
import moment from 'moment';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const TicketsList = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updateTicketData, setUpdateTicketData] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const dispatch = useDispatch();

  const { allTickets, loading, error } = useSelector((state) => state.tickets);
  console.log("allTickets", allTickets);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleStatusChange = (ticketId, newStatus) => {
    dispatch(updateTicket({ id: ticketId, updateData: { status: newStatus } }))
      .unwrap()
      .then(() => dispatch(fetchTickets()))
      .catch((err) => console.error("Error updating status:", err));
  };

  const handleOpenDetails = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleOpenUpdateModal = (ticket) => {
    setUpdateTicketData(ticket);
    setUpdatedDescription(ticket.remark || "");
  };

  const handleUpdateDescription = () => {
    if (!updateTicketData) return;
    dispatch(updateTicket({ id: updateTicketData._id, updateData: { remark: updatedDescription } }))
      .unwrap()
      .then(() => {
        dispatch(fetchTickets());
        setUpdateTicketData(null);
      })
      .catch((err) => console.error("Error updating description:", err));
  };
  const handleSortByDate = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const sortedTickets = [...allTickets].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt);
  });
  return (
    <div className=" p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Tickets</h2>
      {loading && <p>Loading tickets...</p>}
      {allTickets && (
        <div className="overflow-x-auto">
          <table className="table w-full border text-center">
            <thead>
              <tr className="">
                <th className=" px-4 py-2">Ticket ID</th>
                <th className="border px-4 py-2">Title</th>
                {/* <th className="border px-4 py-2">Created At</th> */}
                <th className="border px-4 py-2 cursor-pointer " onClick={handleSortByDate}>
                  Created At {sortOrder === "asc" ? <FaSortUp className=' w-full'/> : <FaSortDown className=' w-full' />}
                </th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTickets.map((ticket) => (
                <tr key={ticket._id} className="border text-center">
                  <td className="border px-4 py-2">{ticket._id}</td>
                  <td
                    className="border px-4 py-2 cursor-pointer text-blue-500 underline"
                    onClick={() => handleOpenDetails(ticket)}
                  >
                    {ticket.title}
                  </td>
                  {/* <td className="border px-4 py-2">{ticket.createdAt}</td> */}
                  <td className="border px-4 py-2">{moment(ticket.createdAt).format('MMM D, YYYY HH:mm')}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="select select-bordered w-full"
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleOpenUpdateModal(ticket)}
                    >
                      Remark
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Ticket Details</h2>
            <p className='my-2 '><strong>Subject:</strong> {selectedTicket.title}</p>
            <p className="font-bold my-1">Description:</p>
            <div className="p-4 border rounded bg-gray-100">{selectedTicket.notes}</div>
            <button className="btn btn-danger mt-4 w-full" onClick={() => setSelectedTicket(null)}>
              Close
            </button>
          </div>
        </div>
      )}
      {updateTicketData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Update Description</h2>
            <textarea
              className="textarea textarea-bordered w-full"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <button className="btn btn-primary mt-4 w-full" onClick={handleUpdateDescription}>
              Save
            </button>
            <button className="btn btn-danger mt-2 w-full" onClick={() => setUpdateTicketData(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TicketsList