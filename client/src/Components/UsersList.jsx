import React, { useEffect, useState, useRef } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers, updateUser } from '../redux/slices/userSlice';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);
  const [editableUser, setEditableUser] = useState(null);
  const [editedData, setEditedData] = useState({});

  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const toggleMenu = (event, userId) => {
    event.stopPropagation(); // Prevent immediate closure
    setOpenMenu(openMenu === userId ? null : userId);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEdit = (user) => {
    console.log(user);

    setEditableUser(user._id);
    setEditedData({ name: user.name, email: user.email });
  };

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };


  const handleSave = (id) => {
    dispatch(updateUser({ id, userData: editedData })).unwrap()
      .then(() => dispatch(fetchUsers()))
      .catch((err) => console.error("Error updating user:", err));
    setEditableUser(null);
  };
  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => dispatch(fetchUsers()))
      .catch((err) => console.error("Error deleting user:", err));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="text-center">
            <th className="border border-gray-300 p-2 ">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-gray-300 text-center">
              <td className="border border-gray-300 p-2">  {editableUser === user._id ? (
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) => handleChange(e, "name")}

                  autoFocus
                />
              ) : (
                user.name
              )}</td>
              <td className="border border-gray-300 p-2">{editableUser === user._id ? (
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) => handleChange(e, "email")}

                />
              ) : (
                user.email
              )}</td>
              <td className="border border-gray-300 p-2 text-center relative">
                {/* <button onClick={(event) => toggleMenu(event, user._id)} className="p-1">
                  <FiMoreVertical size={20} />
                </button> */}
                {editableUser === user._id ? (
                  <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => handleSave(user._id)}>Save</button>
                ) : (
                  <button onClick={(event) => toggleMenu(event, user._id)} className="p-1">
                    <FiMoreVertical size={20} />
                  </button>
                )}
                {openMenu === user._id && (
                  <div ref={menuRef} className="absolute right-0 mt-2 w-32 bg-white shadow-md border rounded-md z-50">
                    <ul className="text-sm">
                      <Link to={`/admin-dashboard/info/${user._id}`}>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">
                          Info
                        </li>
                      </Link>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleEdit(user)}>Edit</li>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-500" onClick={() => handleDelete(user._id)}>Delete</li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
