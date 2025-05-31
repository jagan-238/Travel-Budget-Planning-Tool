import React, { useState } from "react";
import {
  FaTrashAlt,
  FaCalendarAlt,
  FaTag,
  FaDollarSign,
  FaListUl,
  FaPlus,
  FaEdit,
} from "react-icons/fa";

const ExpenseList = ({ expenses, onDelete, onAddOrUpdate }) => {
  const [newExpense, setNewExpense] = useState({
    date: "",
    description: "",
    amount: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (
      !newExpense.date ||
      !newExpense.description.trim() ||
      !newExpense.amount ||
      !newExpense.category.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    const expenseData = {
      ...newExpense,
      amount: parseFloat(newExpense.amount),
    };

    if (editingId) {
      onAddOrUpdate({ ...expenseData, id: editingId }, true);
      setEditingId(null);
    } else {
      onAddOrUpdate({ ...expenseData, id: Date.now() }, false);
    }

    setNewExpense({ date: "", description: "", amount: "", category: "" });
  };

  const handleEditClick = (expense) => {
    setNewExpense({
      date: expense.date,
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
    });
    setEditingId(expense.id);
  };

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <>
      <style>{`
        .expense-list-container {
          max-width: 700px;
          margin: 40px auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgb(0 0 0 / 0.1);
          padding: 20px;
        }

        form.add-expense-form {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 30px;
          align-items: flex-end;
          justify-content: center;
        }

        form.add-expense-form input,
        form.add-expense-form select {
          padding: 10px 12px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          flex: 1 1 140px;
          min-width: 120px;
          outline-offset: 2px;
        }

        form.add-expense-form button {
          background-color: #2c97de;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          font-size: 1rem;
          transition: background-color 0.3s ease;
          user-select: none;
        }

        form.add-expense-form button:hover,
        form.add-expense-form button:focus-visible {
          background-color: #1a6fb3;
          outline: none;
        }

        /* TABLE STYLES */
        table.expense-list {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 8px;
          font-size: 0.95rem;
          color: #333;
        }

        thead {
          background-color: #e7f0fe;
        }

        thead th {
          text-align: left;
          padding: 12px 15px;
          font-weight: 700;
          color: #2c97de;
          border-bottom: 2px solid #2c97de;
          user-select: none;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 1rem;
        }

        tbody tr {
          background: #f9faff;
          border-radius: 8px;
          transition: background-color 0.3s ease;
        }

        tbody tr:hover {
          background: #d6e8ff;
        }

        tbody td {
          padding: 12px 15px;
          vertical-align: middle;
          white-space: nowrap;
        }

        .btn-group {
          display: flex;
          gap: 8px;
          flex-wrap: nowrap;
        }

        button.delete-btn,
        button.edit-btn {
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 6px;
          justify-content: center;
          user-select: none;
          border: none;
          transition: background-color 0.3s ease;
          flex-shrink: 0;
          min-width: 72px;
        }

        button.delete-btn {
          background-color: #ff4d4d;
          color: white;
        }
        button.delete-btn:hover,
        button.delete-btn:focus-visible {
          background-color: #e60000;
          outline: none;
        }

        button.edit-btn {
          background-color: #4caf50;
          color: white;
        }
        button.edit-btn:hover,
        button.edit-btn:focus-visible {
          background-color: #388e3c;
          outline: none;
        }

        .empty-row td {
          text-align: center;
          color: #777;
          padding: 25px;
          font-style: italic;
          font-size: 1rem;
          white-space: normal;
        }

        .total-expenses {
          margin-top: 10px;
          font-weight: 700;
          font-size: 1.1rem;
          text-align: right;
          color: #2c97de;
        }

        /* RESPONSIVE - MEDIUM SCREENS */
        @media (max-width: 700px) {
          thead th {
            font-size: 0.9rem;
            padding: 10px 12px;
          }
          tbody td {
            padding: 10px 12px;
            font-size: 0.9rem;
            white-space: normal; /* Allow wrap */
          }
          button.delete-btn,
          button.edit-btn {
            padding: 10px 12px;
            font-size: 1rem;
            min-width: 64px;
          }
          .btn-group {
            gap: 12px;
            flex-wrap: wrap;
            justify-content: flex-start;
          }
        }

        /* RESPONSIVE - SMALL SCREENS: STACKED CARDS INSTEAD OF TABLE */
        @media (max-width: 480px) {
          table.expense-list,
          thead,
          tbody,
          th,
          td,
          tr {
            display: block;
          }
          thead tr {
            display: none; /* hide header */
          }
          tbody tr {
            margin-bottom: 20px;
            background: #f0f8ff;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 2px 6px rgb(0 0 0 / 0.05);
          }
          tbody td {
            padding: 8px 10px;
            position: relative;
            padding-left: 120px;
            white-space: normal;
            text-align: left;
            font-size: 0.9rem;
          }
          tbody td::before {
            content: attr(data-label);
            position: absolute;
            left: 10px;
            top: 8px;
            font-weight: 700;
            color: #2c97de;
            white-space: nowrap;
          }
          .btn-group {
            justify-content: flex-start;
            gap: 12px;
            flex-wrap: wrap;
          }
          button.delete-btn,
          button.edit-btn {
            width: 48%;
            font-size: 1rem;
            padding: 12px 0;
          }
        }
      `}</style>

      <div className="expense-list-container" aria-label="Expense manager">
        <form
          className="add-expense-form"
          onSubmit={handleAddOrUpdate}
          aria-label={editingId ? "Edit expense form" : "Add new expense form"}
          noValidate
        >
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleChange}
            aria-label="Expense date"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newExpense.description}
            onChange={handleChange}
            aria-label="Expense description"
            required
            autoComplete="off"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            min="0"
            step="0.01"
            value={newExpense.amount}
            onChange={handleChange}
            aria-label="Expense amount"
            required
          />
          <select
            name="category"
            value={newExpense.category}
            onChange={handleChange}
            aria-label="Expense category"
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
          <button
            type="submit"
            aria-label={editingId ? "Update expense" : "Add expense"}
            title={editingId ? "Update expense" : "Add expense"}
          >
            {editingId ? (
              <>
                <FaEdit aria-hidden="true" /> Update
              </>
            ) : (
              <>
                <FaPlus aria-hidden="true" /> Add
              </>
            )}
          </button>
        </form>

        <table className="expense-list" role="grid" aria-describedby="total-expenses">
          <thead>
            <tr>
              <th scope="col">
                <FaCalendarAlt aria-hidden="true" /> Date
              </th>
              <th scope="col">
                <FaListUl aria-hidden="true" /> Description
              </th>
              <th scope="col">
                <FaDollarSign aria-hidden="true" /> Amount
              </th>
              <th scope="col">
                <FaTag aria-hidden="true" /> Category
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 && (
              <tr className="empty-row">
                <td colSpan="5" role="cell">
                  No expenses yet. Add some to get started!
                </td>
              </tr>
            )}
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td data-label="Date">{expense.date}</td>
                <td data-label="Description">{expense.description}</td>
                <td data-label="Amount">${expense.amount.toFixed(2)}</td>
                <td data-label="Category">{expense.category}</td>
                <td data-label="Actions">
                  <div className="btn-group">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(expense)}
                      aria-label={`Edit expense ${expense.description}`}
                      type="button"
                    >
                      <FaEdit aria-hidden="true" /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Delete expense "${expense.description}"?`
                          )
                        )
                          onDelete(expense.id);
                      }}
                      aria-label={`Delete expense ${expense.description}`}
                      type="button"
                    >
                      <FaTrashAlt aria-hidden="true" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          id="total-expenses"
          className="total-expenses"
          aria-live="polite"
          aria-atomic="true"
        >
          Total Expenses: <strong>${totalAmount.toFixed(2)}</strong>
        </div>
      </div>
    </>
  );
};

export default ExpenseList;
