import { useState, useEffect } from "react";

import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setIsAdmin(userRole === "admin");
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {

      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user");
    dispatch(logout());
    setUser(null);
  };
  //   Breadcrumb
  const userInitial = user ? user.charAt(0).toUpperCase() : "U";

  return (
    <nav
      className={`flex justify-between items-center  p-4 shadow-md  ${isAdmin ? "fixed top-0 right-0 z-10 left-64" : ""
        }`}
    >
      {/* <nav className="flex justify-between items-center  p-4 shadow-md "> */}
      {/* Left Side - Tabs */}
      <div className="flex space-x-4">
        <Link to="#">
          <span
            className={"cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100"}
          >
            Tab
          </span>
        </Link>
        <Link to="#">
          <span
            className={"cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100"}
          >
            Link
          </span>
        </Link>
      </div>

      {/* Right Side - Search, Notification, Profile */}
      <div className="flex items-center space-x-4">
        <CiSearch className="w-5 h-5 cursor-pointer hover:text-blue-500" />
        <FaBell className="w-5 h-5 cursor-pointer hover:text-blue-500" />
        
        <div className="flex items-center space-x-2">
          <span className="ml-4 font-semibold">{user || "Guest"}</span>
          {/* <div onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full cursor-pointer">
            {userInitial}
          </div> */}

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                </a>
              </li>
              <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
          </div>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
