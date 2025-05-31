import React from "react";
import jsPDF from "jspdf";

const categories = ["Food", "Transport", "Entertainment", "Others"];

const defaultBudgets = {
  Food: 5000,
  Transport: 2000,
  Entertainment: 3000,
  Others: 1000,
};

const expenses = [
  { category: "Food", amount: 4500 },
  { category: "Transport", amount: 1900 },
  { category: "Entertainment", amount: 2800 },
  { category: "Others", amount: 800 },
];

const formatCurrency = (num) => `₹${num.toFixed(2)}`;

export default function ExpenseReport() {
  // Calculate totals and adherence
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalBudget = Object.values(defaultBudgets).reduce(
    (sum, b) => sum + b,
    0
  );

  // Category-wise spent and adherence
  const categorySummary = categories.map((cat) => {
    const spent = expenses
      .filter((e) => e.category === cat)
      .reduce((a, b) => a + b.amount, 0);
    const budget = defaultBudgets[cat];
    const adherence = ((spent / budget) * 100).toFixed(1);
    return { category: cat, spent, budget, adherence };
  });

  // Generate CSV text
  const generateCSV = () => {
    let csv = "Category,Spent,Budget,Adherence (%)\n";
    categorySummary.forEach(({ category, spent, budget, adherence }) => {
      csv += `${category},${spent},${budget},${adherence}\n`;
    });
    csv += `Total,${totalSpent},${totalBudget},${(
      (totalSpent / totalBudget) *
      100
    ).toFixed(1)}\n`;
    return csv;
  };

  // Export CSV
  const exportCSV = () => {
    const csvData = generateCSV();
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expense_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Expense Report", 14, 20);

    doc.setFontSize(12);
    let y = 30;

    // Headers
    doc.text("Category", 14, y);
    doc.text("Spent", 64, y);
    doc.text("Budget", 114, y);
    doc.text("Adherence (%)", 164, y);
    y += 8;

    categorySummary.forEach(({ category, spent, budget, adherence }) => {
      doc.text(category, 14, y);
      doc.text(formatCurrency(spent), 64, y);
      doc.text(formatCurrency(budget), 114, y);
      doc.text(adherence, 164, y);
      y += 8;
    });

    y += 10;
    doc.text(`Total Spent: ${formatCurrency(totalSpent)}`, 14, y);
    y += 8;
    doc.text(`Total Budget: ${formatCurrency(totalBudget)}`, 14, y);
    y += 8;
    doc.text(
      `Overall Adherence: ${((totalSpent / totalBudget) * 100).toFixed(1)}%`,
      14,
      y
    );

    doc.save("expense_report.pdf");
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 1rem 1.5rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f4f4f4;
        }
        .btns {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        button {
          background-color: #2196f3;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #1976d2;
        }
        @media (max-width: 480px) {
          .container {
            padding: 1rem;
            margin: 1rem;
          }
          table, th, td {
            font-size: 0.9rem;
          }
          button {
            padding: 8px 12px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="container" role="main">
        <h2>Expense Report</h2>

        <table aria-label="Expense report table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Spent</th>
              <th>Budget</th>
              <th>Adherence (%)</th>
            </tr>
          </thead>
          <tbody>
            {categorySummary.map(({ category, spent, budget, adherence }) => (
              <tr key={category}>
                <td>{category}</td>
                <td>{formatCurrency(spent)}</td>
                <td>{formatCurrency(budget)}</td>
                <td>{adherence}</td>
              </tr>
            ))}
            <tr style={{ fontWeight: "bold" }}>
              <td>Total</td>
              <td>{formatCurrency(totalSpent)}</td>
              <td>{formatCurrency(totalBudget)}</td>
              <td>{((totalSpent / totalBudget) * 100).toFixed(1)}</td>
            </tr>
          </tbody>
        </table>

        <div className="btns">
          <button onClick={exportCSV} aria-label="Export report as CSV">
            Export CSV
          </button>
          <button onClick={exportPDF} aria-label="Export report as PDF">
            Export PDF
          </button>
        </div>
      </div>
    </>
  );
}
