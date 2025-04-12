import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("http://localhost/api-zalpe-komputer/api/session.php", {
        credentials: "include",
      });

      const data = await response.json();
      setIsAuthenticated(data.logged_in);
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
