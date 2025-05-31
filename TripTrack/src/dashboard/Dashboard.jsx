import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

import CategoryManager from "../components/CategoryManager";
import BudgetOverview from "../components/BudgetOverview";
import ExpenseForm from "../components/ExpenseForm";
// import ExpenseList from "../components/ExpenseList";
import Notifications from "../components/Notifications";
import WeeklyMonthlyOverview from "../components/WeeklyMonthlyOverview";
import CurrencyConverter from "../components/CurrencyConverter";
import CollaborativeBudget from "../components/CollaborativeBudget";
import ExpenseReports from "../components/ExpenseReports";

export default function Dashboard({
  user,
  categories,
  addCategory,
  removeCategory,
  budgets,
  setBudgetForCategory,
  expenses,
  addExpense,
  removeExpense,
  notifications,
  currency,
  setCurrency,
  exchangeRates,
}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to login page after logout
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div
      className="dashboard"
      style={{
        padding: "20px 15px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "2.6rem",
            color: "purple",
            flexGrow: 1,
            minWidth: "150px",
          }}
        >
           Travel Budget Planner
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 20px",
            cursor: "pointer",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "1rem",
            minWidth: "100px",
            touchAction: "manipulation", // improves tap responsiveness on mobile
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#c0392b")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#e74c3c")}
          aria-label="Logout"
        >
          Logout
        </button>
      </header>

      <p
        style={{
          marginBottom: "25px",
          fontSize: "1.1rem",
          color: "#34495e",
          wordBreak: "break-word",
        }}
      >
        Welcome, <strong>{user?.email}</strong>
      </p>

      {/* Sections with responsive spacing */}
      <section style={{ marginBottom: "30px" }}>
        <CategoryManager
          categories={categories}
          addCategory={addCategory}
          removeCategory={removeCategory}
        />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <BudgetOverview
          budgets={budgets}
          setBudgetForCategory={setBudgetForCategory}
          categories={categories}
        />
      </section>

      {/* Uncomment when ExpenseForm and ExpenseList are ready to be included */}
      {/*
      <section style={{ marginBottom: "30px" }}>
        <ExpenseForm categories={categories} addExpense={addExpense} />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <ExpenseList expenses={expenses} removeExpense={removeExpense} />
      </section>
      */}

      <section style={{ marginBottom: "30px" }}>
        <Notifications notifications={notifications} />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <WeeklyMonthlyOverview expenses={expenses} />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <CurrencyConverter
          currency={currency}
          setCurrency={setCurrency}
          exchangeRates={exchangeRates}
        />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <CollaborativeBudget />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <ExpenseReports expenses={expenses} />
      </section>
    </div>
  );
}
