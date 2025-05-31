import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Logout from "./pages/logout";

import Dashboard from "./dashboard/Dashboard"; 

import "./App.css";
import "./Login.css";
import "./about.css";
import "./navbar.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    "Accommodation", "Food", "Transportation", "Activities", "Shopping", "Miscellaneous",
  ]);
  const [budgets, setBudgets] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setExchangeRates({
      USD: 1,
      EUR: 0.85,
      INR: 83,
      GBP: 0.75,
    });
  }, []);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
    checkBudgetLimit(expense.category);
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const setBudgetForCategory = (category, amount) => {
    setBudgets((prev) => ({ ...prev, [category]: amount }));
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
    }
  };

  const removeCategory = (category) => {
    setCategories((prev) => prev.filter((cat) => cat !== category));
  };

  const checkBudgetLimit = (category) => {
    const total = expenses
      .filter((e) => e.category === category)
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const limit = budgets[category];

    if (limit && total > limit) {
      setNotifications((prev) => [
        ...prev,
        `You have exceeded your budget for ${category}`,
      ]);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={!user ? <Login onLogin={setUser} /> : <Navigate to="/dashboard" />}
        />
         <Route path="/logout" element={<Logout />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard
                user={user}
                categories={categories}
                addCategory={addCategory}
                removeCategory={removeCategory}
                budgets={budgets}
                setBudgetForCategory={setBudgetForCategory}
                expenses={expenses}
                addExpense={addExpense}
                removeExpense={removeExpense}
                notifications={notifications}
                currency={currency}
                setCurrency={setCurrency}
                exchangeRates={exchangeRates}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
