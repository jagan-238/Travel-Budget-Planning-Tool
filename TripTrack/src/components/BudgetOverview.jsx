import React, { useState } from "react";

const BudgetingTool = () => {
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [spent, setSpent] = useState("");
  const [budgets, setBudgets] = useState([]);

  const addBudget = () => {
    if (!category.trim() || !budget || isNaN(budget) || budget <= 0) {
      alert("Please enter valid category and positive budget");
      return;
    }
    if (spent && (isNaN(spent) || spent < 0)) {
      alert("Spent amount must be zero or positive number");
      return;
    }

    setBudgets((prev) => [
      ...prev,
      { id: Date.now(), category: category.trim(), budget: +budget, spent: +spent || 0 },
    ]);
    setCategory("");
    setBudget("");
    setSpent("");
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
          margin: 1rem;
          background: #f4f7f9;
          color: #333;
        }
        h2 {
          text-align: center;
        }
        .budget-container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
        }
        .category-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 1rem;
        }
        .category-row > * {
          flex: 1 1 120px;
        }
        input[type="text"], input[type="number"] {
          padding: 0.5rem;
          font-size: 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          width: 100%;
          outline-offset: 2px;
          -webkit-appearance: none;
          -moz-appearance: textfield;
        }
        button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border: none;
          border-radius: 6px;
          background: #007bff;
          color: white;
          cursor: pointer;
          flex: 1 1 100px;
          transition: background 0.3s ease;
        }
        button:hover,
        button:focus {
          background: #0056b3;
        }
        .budget-list {
          margin-top: 1rem;
        }
        .budget-item {
          margin-bottom: 1rem;
        }
        .budget-item h3 {
          margin: 0 0 0.3rem 0;
          font-weight: 600;
        }
        .progress-wrapper {
          background: #eee;
          border-radius: 10px;
          height: 18px;
          width: 100%;
          overflow: hidden;
          box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.2);
        }
        .progress-bar {
          height: 100%;
          border-radius: 10px 0 0 10px;
          background: #28a745;
          width: 0%;
          transition: width 0.5s ease;
        }
        .progress-bar.over-budget {
          background: #dc3545;
        }
        .budget-info {
          font-size: 0.9rem;
          margin-top: 0.2rem;
        }
        @media (max-width: 600px) {
          body {
            margin: 0.5rem;
          }
          .budget-container {
            padding: 1rem;
          }
          .category-row {
            flex-direction: column;
          }
          button {
            flex: 1 1 auto;
            width: 100%;
          }
        }
      `}</style>

      <div className="budget-container" role="main" aria-label="Budgeting Tool">
        <h2>Budgeting Tool</h2>

        <div className="category-row">
          <input
            type="text"
            placeholder="Category (e.g. Food)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Expense category"
          />
          <input
            type="number"
            placeholder="Budget Amount"
            value={budget}
            min="0"
            onChange={(e) => setBudget(e.target.value)}
            aria-label="Budget amount"
          />
          <input
            type="number"
            placeholder="Spent Amount"
            value={spent}
            min="0"
            onChange={(e) => setSpent(e.target.value)}
            aria-label="Spent amount"
          />
          <button onClick={addBudget} aria-label="Add budget category">
            Add
          </button>
        </div>

        <div className="budget-list" aria-live="polite" aria-relevant="additions removals">
          {budgets.length === 0 && <p>No budget categories added yet.</p>}

          {budgets.map(({ id, category, budget, spent }) => {
            const percentSpent = Math.min((spent / budget) * 100, 100);
            const overBudget = spent > budget;
            return (
              <div key={id} className="budget-item">
                <h3>{category}</h3>
                <div className="progress-wrapper" aria-label={`Budget progress for ${category}`}>
                  <div
                    className={`progress-bar ${overBudget ? "over-budget" : ""}`}
                    style={{ width: `${percentSpent}%` }}
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={Math.round(percentSpent)}
                    aria-describedby={`budget-info-${id}`}
                  />
                </div>
                <div className="budget-info" id={`budget-info-${id}`}>
                  Spent: ₹{spent} / Budget: ₹{budget}{" "}
                  {overBudget && <strong style={{ color: "#dc3545" }}> (Over budget!)</strong>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BudgetingTool;

