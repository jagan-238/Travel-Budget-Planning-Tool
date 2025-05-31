import React, { useState } from "react";

export default function MonthlyOverview() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // Add new expense
  const addExpense = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive amount");
      return;
    }
    if (!date) {
      alert("Please select a date");
      return;
    }
    setExpenses((prev) => [
      ...prev,
      { id: Date.now(), amount: +amount, date: new Date(date) },
    ]);
    setAmount("");
    setDate("");
  };

  // Aggregate expenses by month (YYYY-MM)
  const aggregateByMonth = () => {
    const totals = {};
    expenses.forEach(({ amount, date }) => {
      const d = new Date(date);
      const key = `${d.getFullYear()}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      totals[key] = (totals[key] || 0) + amount;
    });
    // Sort keys ascending
    return Object.keys(totals)
      .sort()
      .map((month) => ({ month, total: totals[month] }));
  };

  const monthlyTotals = aggregateByMonth();
  const maxTotal = monthlyTotals.reduce((max, m) => Math.max(max, m.total), 0) || 1;

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
          margin: 1rem;
          background: #f9fafb;
          color: #333;
        }
        h2 {
          text-align: center;
        }
        .container {
          max-width: 600px;
          margin: 0 auto 2rem auto;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
        }
        .input-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 1rem;
          justify-content: center;
        }
        input[type="number"], input[type="date"] {
          flex: 1 1 120px;
          padding: 0.5rem;
          font-size: 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          outline-offset: 2px;
        }
        button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background:rgb(240, 14, 217);
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          flex: 1 1 100px;
          transition: background 0.3s ease;
        }
        button:hover, button:focus {
          background:rgb(86, 239, 55);
        }
        .bar-chart {
          display: flex;
          gap: 10px;
          align-items: flex-end;
          height: 150px;
          border-left: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          padding-left: 10px;
          overflow-x: auto;
          scrollbar-width: thin;
        }
        .bar {
          flex: 1 0 40px;
          background:rgb(255, 238, 0);
          border-radius: 4px 4px 0 0;
          cursor: default;
          position: relative;
          transition: background 0.3s ease;
        }
        .bar:hover {
          background:rgb(12, 252, 4);
        }
        .bar-label {
          text-align: center;
          margin-top: 6px;
          font-size: 0.8rem;
          white-space: nowrap;
        }
        .bar-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 6px;
          background: #333;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          white-space: nowrap;
          z-index: 10;
        }
        .bar:hover .bar-tooltip {
          opacity: 1;
        }

        @media (max-width: 480px) {
          .input-row {
            flex-direction: column;
            gap: 0.5rem;
          }
          input[type="number"], input[type="date"], button {
            flex: 1 1 100%;
          }
          .bar {
            flex: 1 0 30px;
          }
          .bar-chart {
            height: 120px;
          }
        }
      `}</style>

      <div className="container" aria-label="Add new expense">
        <h2>Monthly Expense Overview</h2>
        <div className="input-row">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            min="0"
            onChange={(e) => setAmount(e.target.value)}
            aria-label="Expense amount"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Expense date"
          />
          <button onClick={addExpense} aria-label="Add expense">
            Add
          </button>
        </div>

        {monthlyTotals.length === 0 ? (
          <p style={{ textAlign: "center" }}>No expenses logged yet.</p>
        ) : (
          <div className="bar-chart" aria-label="Monthly expenses chart">
            {monthlyTotals.map(({ month, total }) => {
              const heightPercent = (total / maxTotal) * 100;
              return (
                <div
                  key={month}
                  className="bar"
                  style={{ height: `${heightPercent}%` }}
                  role="img"
                  aria-label={`Month ${month}, total expense ₹${total.toFixed(2)}`}
                  tabIndex={0}
                >
                  <div className="bar-tooltip">₹{total.toFixed(2)}</div>
                  <div className="bar-label">{month}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
