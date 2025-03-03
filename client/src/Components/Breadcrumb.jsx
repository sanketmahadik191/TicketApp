import React from 'react'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toggleTheme } from '../redux/slices/themeSlice';

const Breadcrumb = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);
    const location = useLocation();
    // const pageName = location.pathname.split("/").pop();
  
    // Extract page name correctly
    const pathSegments = location.pathname.split("/");
    const pageName = pathSegments.length > 2 ? pathSegments[pathSegments.length - 2] : pathSegments.pop();
  return (
    <div className="flex justify-between items-center mb-4">
    <div>
      <span className="text-gray-500">Dashboard /</span>
      <span className="font-semibold text-blue-400"> {pageName}</span>
    </div>
    <div className="flex items-center space-x-2">
      <MdOutlineLightMode />
      <input
        type="checkbox"
        className="toggle"
        checked={theme === "dark"}
        onChange={() => dispatch(toggleTheme())}
      />
    <MdDarkMode />
    </div>
  </div>
  )
}

export default Breadcrumb


// import React from "react";
// import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { toggleTheme } from "../redux/slices/themeSlice";

// const Breadcrumb = () => {
//   const dispatch = useDispatch();
//   const theme = useSelector((state) => state.theme.theme);
//   const location = useLocation();
//   const pathSegments = location.pathname.split("/").filter((segment) => segment); // Remove empty segments

//   return (
//     <div className="flex justify-between items-center mb-4">
//       {/* Breadcrumb Navigation */}
//       <div>
//         <Link to="/" className="text-gray-500 hover:text-blue-500">
//           Dashboard
//         </Link>
//         {pathSegments.map((segment, index) => {
//           const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
//           return (
//             <span key={index}>
//               {" / "}
//               <Link to={fullPath} className="text-blue-400 hover:underline capitalize">
//                 {segment.replace("-", " ")}
//               </Link>
//             </span>
//           );
//         })}
//       </div>

//       {/* Theme Toggle */}
//       <div className="flex items-center space-x-2">
//         <MdOutlineLightMode />
//         <input
//           type="checkbox"
//           className="toggle"
//           checked={theme === "dark"}
//           onChange={() => dispatch(toggleTheme())}
//         />
//         <MdDarkMode />
//       </div>
//     </div>
//   );
// };

// export default Breadcrumb;
