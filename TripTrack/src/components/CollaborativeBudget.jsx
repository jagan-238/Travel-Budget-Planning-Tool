import React, { useEffect, useState } from "react";

const initialBudget = {
  expenses: [],
  contributors: ["user1"],
};

export default function CollaborativeBudget() {
  const [budget, setBudget] = useState(initialBudget);
  const [newExpense, setNewExpense] = useState("");
  const [emailToInvite, setEmailToInvite] = useState("");

  function addExpense() {
    if (!newExpense) return;
    const expense = {
      id: Date.now(),
      amount: parseFloat(newExpense),
      addedBy: "user1",
    };
    setBudget((prev) => ({
      ...prev,
      expenses: [...prev.expenses, expense],
    }));
    setNewExpense("");
  }

  function inviteCollaborator() {
    if (!emailToInvite) return;
    setBudget((prev) => ({
      ...prev,
      contributors: [...prev.contributors, emailToInvite],
    }));
    setEmailToInvite("");
  }

  return (
    <>
      <style>{`
        .container {
          max-width: 400px;
          margin: 1rem auto;
          padding: 1rem;
          background: #f9f9f9;
          border-radius: 8px;
          font-family: Arial, sans-serif;
        }
        input, button {
          padding: 0.6rem 1rem;
          font-size: 1rem;
          margin-right: 0.5rem;
          margin-bottom: 1rem;
        }
        ul {
          list-style: none;
          padding-left: 0;
        }
        .expense-item {
          margin-bottom: 0.5rem;
        }
        .contributors {
          background: #fff;
          padding: 0.8rem;
          border-radius: 6px;
          margin-top: 1rem;
        }
      `}</style>

      <div className="container">
        <h2>Shared Budget</h2>

        <div>
          <input
            type="number"
            placeholder="Add expense amount"
            value={newExpense}
            onChange={(e) => setNewExpense(e.target.value)}
            min="0"
          />
          <button onClick={addExpense}>Add Expense</button>
        </div>

        <h3>Expenses:</h3>
        <ul>
          {budget.expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              {expense.amount} by {expense.addedBy}
            </li>
          ))}
        </ul>

        <div className="contributors">
          <h3>Contributors:</h3>
          <ul>
            {budget.contributors.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Invite by email"
            value={emailToInvite}
            onChange={(e) => setEmailToInvite(e.target.value)}
          />
          <button onClick={inviteCollaborator}>Invite</button>
        </div>
      </div>
    </>
  );
}
