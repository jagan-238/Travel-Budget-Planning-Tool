import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const defaultCategories = [
  "Accommodation",
  "Food",
  "Activities",
  "Transportation",
  "Dining",
  "Entertainment",
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA336A",
  "#5533AA",
  "#33AA99",
  "#FF5555",
];

export default function ExpenseTrackerWithChart() {
  const [categories, setCategories] = useState(defaultCategories);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    date: "",
    description: "",
    amount: "",
    category: categories[0],
  });
  const [newCategory, setNewCategory] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAddOrUpdate = () => {
    if (!form.date || !form.description || !form.amount || !form.category) return;

    if (editIndex === null) {
      setExpenses((exps) => [...exps, form]);
    } else {
      setExpenses((exps) =>
        exps.map((exp, i) => (i === editIndex ? form : exp))
      );
      setEditIndex(null);
    }
    setForm({ date: "", description: "", amount: "", category: categories[0] });
  };

  const handleEdit = (index) => {
    setForm(expenses[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setExpenses((exps) => exps.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setForm({ date: "", description: "", amount: "", category: categories[0] });
    }
  };

  const addCategory = () => {
    const trimmed = newCategory.trim();
    if (
      trimmed &&
      !categories.some((cat) => cat.toLowerCase() === trimmed.toLowerCase())
    ) {
      setCategories((cats) => [...cats, trimmed]);
      setForm((f) => ({ ...f, category: trimmed }));
    }
    setNewCategory("");
  };

  // Calculate total spent per category for the chart
  const data = useMemo(() => {
    const totals = {};
    expenses.forEach(({ category, amount }) => {
      const amt = parseFloat(amount);
      if (!isNaN(amt)) {
        totals[category] = (totals[category] || 0) + amt;
      }
    });
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0; font-family: Arial, sans-serif;
          background: #f9f9f9;
        }
        .container {
          max-width: 900px;
          margin: 1rem auto;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 1rem;
          color: #222;
        }
        form {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          justify-content: center;
        }
        input, select, button {
          font-size: 1rem;
          padding: 0.6rem 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline-offset: 2px;
          outline-color: transparent;
          transition: outline-color 0.2s ease;
        }
        input:focus, select:focus {
          outline-color: #007BFF;
          border-color: #007BFF;
        }
        input[type="date"] {
          min-width: 150px;
        }
        input[type="number"] {
          max-width: 120px;
        }
        select {
          min-width: 140px;
        }
        button {
          background-color: #007BFF;
          color: white;
          border: none;
          cursor: pointer;
          min-width: 130px;
          user-select: none;
          touch-action: manipulation;
        }
        button:active {
          background-color: #0056b3;
        }
        .category-add {
          display: flex;
          gap: 0.5rem;
          width: 100%;
          max-width: 320px;
          margin: 0 auto 1rem;
        }
        .category-add input {
          flex-grow: 1;
        }
        .category-add button {
          min-width: 100px;
          background-color: #28a745;
        }
        .category-add button:active {
          background-color: #1e7e34;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
          min-width: 300px;
          margin-top: 1rem;
        }
        th, td {
          padding: 10px 12px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #f0f0f0;
          font-weight: 600;
        }
        td button {
          margin-right: 8px;
          padding: 6px 10px;
          border-radius: 5px;
          font-size: 0.9rem;
          min-width: 60px;
        }
        td button:last-child {
          margin-right: 0;
        }
        td button.edit {
          background-color: #28a745;
          color: white;
          border: none;
          cursor: pointer;
          touch-action: manipulation;
        }
        td button.edit:active {
          background-color: #1e7e34;
        }
        td button.delete {
          background-color: #dc3545;
          color: white;
          border: none;
          cursor: pointer;
          touch-action: manipulation;
        }
        td button.delete:active {
          background-color: #a71d2a;
        }
        .chart-container {
          width: 100%;
          height: 300px;
          margin-top: 2rem;
        }
        @media (max-width: 600px) {
          form {
            flex-direction: column;
            gap: 1rem;
          }
          input, select, button {
            width: 100% !important;
            max-width: none;
          }
          .category-add {
            max-width: 100%;
          }
          table, thead, tbody, th, td, tr {
            display: block;
            width: 100%;
          }
          thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }
          tr {
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            background: #fff;
          }
          td {
            border: none;
            position: relative;
            padding-left: 50%;
            text-align: right;
            font-size: 0.9rem;
          }
          td::before {
            position: absolute;
            top: 10px;
            left: 12px;
            width: 45%;
            white-space: nowrap;
            font-weight: 600;
            text-align: left;
            content: attr(data-label);
          }
          td button {
            width: 48%;
            margin: 0 1% 0 0;
            font-size: 1rem;
          }
          td button.delete {
            margin-right: 0;
            margin-top: 0.5rem;
          }
        }
      `}</style>

      <div className="container">
        <h2>Travel Expense Tracker</h2>

        {/* Category Add */}
        <div className="category-add">
          <input
            type="text"
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            aria-label="Add new category"
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
          />
          <button onClick={addCategory} aria-label="Add category">
            Add Category
          </button>
        </div>

        {/* Expense Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddOrUpdate();
          }}
        >
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            aria-label="Expense date"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            aria-label="Expense description"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            aria-label="Expense amount"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            aria-label="Expense category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button type="submit" aria-label="Add or update expense">
            {editIndex === null ? "Add Expense" : "Update Expense"}
          </button>
        </form>

        {/* Expenses Table */}
        {expenses.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            No expenses logged yet.
          </p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(({ date, description, amount, category }, i) => (
                  <tr key={i}>
                    <td data-label="Date">{date}</td>
                    <td data-label="Description">{description}</td>
                    <td data-label="Amount">${parseFloat(amount).toFixed(2)}</td>
                    <td data-label="Category">{category}</td>
                    <td data-label="Actions">
                      <button
                        className="edit"
                        onClick={() => handleEdit(i)}
                        aria-label={`Edit expense ${description}`}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(i)}
                        aria-label={`Delete expense ${description}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pie Chart */}
            <div className="chart-container" role="img" aria-label="Pie chart of expenses by category">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        cursor="pointer"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      `$${value.toFixed(2)} spent`
                    }
                    contentStyle={{ backgroundColor: "#fff", borderRadius: 8 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </>
  );
}
