import Navbar from "../../components/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
function Layout() {
  const location = useLocation();

  // List of paths where the Navbar should not be shown
  const noNavbarPaths = ["/register", "/login"];

  return (
    <div className="layout">
      {/* Render Navbar only if not on register or login page */}
      {!noNavbarPaths.includes(location.pathname) && (
        <div className="navbar">
          <Navbar />
        </div>
      )}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
export { Layout, RequireAuth };
