import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate("/dashboard");
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      setUser({ ...userCredential.user, displayName: name });
      setMessage("Registration successful!");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found") {
        setError("User not found. Please register before logging in.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email to reset password.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent.");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? "Register" : "Login"}</h2>

      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        {isRegistering && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          autoComplete="current-password" 
        />

        <button type="submit" disabled={loading}>
          {loading
            ? isRegistering
              ? "Registering..."
              : "Logging in..."
            : isRegistering
            ? "Register"
            : "Login"}
        </button>
      </form>

      <button
        type="button"
        className="toggle-button"
        onClick={() => setIsRegistering(!isRegistering)}
        disabled={loading}
      >
        {isRegistering
          ? "Have an account? Login"
          : "Don't have an account? Register"}
      </button>

      {!isRegistering && (
        <div>
          <button
            type="button"
            className="forgot-button"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            Forgot Password
          </button>
        </div>
      )}

      {error && <p className="auth-message error">{error}</p>}
      {message && <p className="auth-message success">{message}</p>}
    </div>
  );
}
