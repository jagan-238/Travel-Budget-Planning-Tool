import React, { useState } from "react";

const defaultCategories = [
  "Accommodation",
  "Food",
  "Activities",
  "Transportation",
  "Dining",
  "Entertainment",
];

export default function ExpenseTracker() {
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
    const newExp = { ...form };

    if (editIndex === null) {
      setExpenses((exps) => [...exps, newExp]);
    } else {
      setExpenses((exps) =>
        exps.map((exp, i) => (i === editIndex ? newExp : exp))
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

  return (
    <div className="container">
      <style>{`
        * { box-sizing: border-box; }
        body {
          margin: 0; font-family: Arial, sans-serif; background: #f9f9f9;
        }
        .container {
          max-width: 700px;
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
        }
        td button.edit:active {
          background-color: #1e7e34;
        }
        td button.delete {
          background-color: #dc3545;
          color: white;
          border: none;
        }
        td button.delete:active {
          background-color: #a71d2a;
        }
        @media (max-width: 600px) {
          form {
            flex-direction: column;
            gap: 1rem;
          }
          input, select, button {
            width: 100% !important;
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
        }
      `}</style>

      <h2>Trip Expense Tracker</h2>

      <form>
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input type="text" name="description" value={form.description} placeholder="Description" onChange={handleChange} />
        <input type="number" name="amount" value={form.amount} placeholder="Amount" onChange={handleChange} />
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="button" onClick={handleAddOrUpdate}>
          {editIndex === null ? "Add Expense" : "Update Expense"}
        </button>
      </form>

      <div className="category-add">
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="button" onClick={addCategory}>Add Category</button>
      </div>

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
          {expenses.map((exp, index) => (
            <tr key={index}>
              <td data-label="Date">{exp.date}</td>
              <td data-label="Description">{exp.description}</td>
              <td data-label="Amount">{exp.amount}</td>
              <td data-label="Category">{exp.category}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
