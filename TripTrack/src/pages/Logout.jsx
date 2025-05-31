import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Adjust path as needed

export default function Logout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await signOut(auth); 
        setUser(null);       
        navigate("/login");   
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    logoutUser();
  }, [setUser, navigate]);

  return <p>Logging out...</p>;
}
