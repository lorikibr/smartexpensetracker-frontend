import React, { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../api/expenseApi";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses().then(setExpenses);
  }, []);

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <ul>
      {expenses.map((exp) => (
        <li key={exp.id}>
          {exp.title} - {exp.amount} denar on {exp.date}
          <button onClick={() => handleDelete(exp.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
