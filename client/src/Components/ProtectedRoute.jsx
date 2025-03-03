import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    setRole(storedRole);

    if (!isAuthenticated || !storedRole || !allowedRoles.includes(storedRole)) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, allowedRoles]);

  return isAuthenticated && role && allowedRoles.includes(role) ? children : null;
};

export default ProtectedRoute;
