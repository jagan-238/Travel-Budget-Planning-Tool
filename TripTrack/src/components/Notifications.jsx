import React, { useState, useEffect } from "react";

const categories = ["Food", "Transport", "Entertainment", "Others"];

// Simulated user budgets per category
const defaultBudgets = {
  Food: 5000,
  Transport: 2000,
  Entertainment: 3000,
  Others: 1000,
};

// Helper to format currency
const formatCurrency = (num) => `₹${num.toFixed(2)}`;

export default function BudgetAlerts() {
  const [budgets, setBudgets] = useState(defaultBudgets);
  // Example expenses: array of { category, amount }
  const [expenses, setExpenses] = useState([
    { category: "Food", amount: 4500 },
    { category: "Transport", amount: 1900 },
    { category: "Entertainment", amount: 2800 },
    { category: "Others", amount: 800 },
  ]);

  // Notification preferences
  const [prefs, setPrefs] = useState({
    inApp: true,
    email: false,
  });

  // Store alerts to show
  const [alerts, setAlerts] = useState([]);

  // Check budgets vs expenses
  useEffect(() => {
    const newAlerts = [];

    categories.forEach((cat) => {
      const spent = expenses
        .filter((e) => e.category === cat)
        .reduce((a, b) => a + b.amount, 0);
      const budget = budgets[cat];

      // Notify if spent >= 90% of budget (approaching)
      if (spent >= budget * 0.9 && spent < budget) {
        newAlerts.push({
          category: cat,
          type: "warning",
          message: `Approaching budget limit in ${cat}: ${formatCurrency(
            spent
          )} of ${formatCurrency(budget)} spent.`,
        });
      }
      // Notify if exceeded
      if (spent >= budget) {
        newAlerts.push({
          category: cat,
          type: "error",
          message: `Budget exceeded in ${cat}! ${formatCurrency(
            spent
          )} spent, budget was ${formatCurrency(budget)}.`,
        });
      }
    });

    setAlerts(newAlerts);

    // Simulate sending email alerts (only if email pref is enabled)
    if (prefs.email) {
      newAlerts.forEach((alert) => {
        // Here, you would normally trigger an API call to send email
        console.log(
          `Email Alert: ${alert.type.toUpperCase()} - ${alert.message}`
        );
      });
    }
  }, [expenses, budgets, prefs.email]);

  return (
    <>
      <style>{`
        .container {
          max-width: 600px;
          margin: 1rem auto;
          padding: 1rem 1.5rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
        }
        .alerts {
          margin-top: 1rem;
        }
        .alert {
          padding: 10px 15px;
          margin-bottom: 10px;
          border-radius: 5px;
          color: white;
          font-weight: bold;
        }
        .alert.warning {
          background-color: #ff9800;
        }
        .alert.error {
          background-color: #f44336;
        }
        .prefs {
          margin-top: 1rem;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 10px;
        }
        label {
          font-weight: normal;
          cursor: pointer;
        }
        input[type="checkbox"] {
          margin-right: 5px;
          cursor: pointer;
          transform: scale(1.2);
          vertical-align: middle;
        }
      `}</style>

      <div className="container" aria-live="polite">
        <h2>Budget Alerts & Notification Preferences</h2>

        <div className="prefs" aria-label="Notification preferences">
          <label>
            <input
              type="checkbox"
              checked={prefs.inApp}
              onChange={() =>
                setPrefs((p) => ({ ...p, inApp: !p.inApp }))
              }
            />
            In-App Alerts
          </label>

          <label>
            <input
              type="checkbox"
              checked={prefs.email}
              onChange={() =>
                setPrefs((p) => ({ ...p, email: !p.email }))
              }
            />
            Email Alerts
          </label>
        </div>

        <div className="alerts" aria-live="assertive" aria-atomic="true">
          {prefs.inApp && alerts.length === 0 && (
            <p>No alerts at the moment. You are within budget limits.</p>
          )}
          {prefs.inApp &&
            alerts.map(({ category, type, message }, idx) => (
              <div
                key={idx}
                className={`alert ${type}`}
                role="alert"
                tabIndex={0}
                aria-label={`${type} alert for ${category}`}
              >
                {message}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
