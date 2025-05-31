import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase"; 

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className={isActive("/") ? "active-link" : ""}>Home</Link>
        </li>
        <li>
          <Link to="/about" className={isActive("/about") ? "active-link" : ""}>About</Link>
        </li>
        <li>
          <Link to="/contact" className={isActive("/contact") ? "active-link" : ""}>Contact</Link>
        </li>
        {user ? (
          <>
            <li><span>Welcome, {user.displayName || user.email}</span></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li>
          <Link to="/login">
              <button className={`login-btn ${isActive("/login") ? "active-link" : ""}`}>Login</button>
          </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
