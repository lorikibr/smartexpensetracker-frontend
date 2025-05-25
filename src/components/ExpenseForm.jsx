import React, { useState } from "react";
import { addExpense } from "../api/expenseApi";

//Accept onExpenseAdded as a prop
export default function ExpenseForm({ onExpenseAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const categories = [
    "Food",
    "Transport",
    "Utilities",
    "Entertainment",
    "Health",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense({ title, amount: parseFloat(amount), date, category });

    //Clear input fields
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");

    //Call the parent function to refresh the expense list
    if (onExpenseAdded) {
      onExpenseAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}
