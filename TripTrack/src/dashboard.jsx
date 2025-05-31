import React from "react";

import CategoryManager from "../components/CategoryManager";
import BudgetOverview from "../components/BudgetOverview";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
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
  return (
    <>
      <h1>🌍 Travel Budget Planner</h1>
      <p>Welcome, {user.email}</p>

      <CategoryManager
        categories={categories}
        addCategory={addCategory}
        removeCategory={removeCategory}
      />
      <BudgetOverview
        budgets={budgets}
        setBudgetForCategory={setBudgetForCategory}
        categories={categories}
      />
      <ExpenseForm categories={categories} addExpense={addExpense} />
      <ExpenseList expenses={expenses} removeExpense={removeExpense} />
      <Notifications notifications={notifications} />
      <WeeklyMonthlyOverview expenses={expenses} />
      <CurrencyConverter
        currency={currency}
        setCurrency={setCurrency}
        exchangeRates={exchangeRates}
      />
      <CollaborativeBudget />
      <ExpenseReports expenses={expenses} />
    </>
  );
}
