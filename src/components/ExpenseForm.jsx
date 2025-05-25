import React, { useState } from "react";
import { addExpense } from "../api/ExpenseApi";
import { categories } from "../Constants";

export default function ExpenseForm({ onExpenseAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid positive amount");
      return;
    }
    if (!date) {
      alert("Date is required");
      return;
    }
    if (!category) {
      alert("Please select a category");
      return;
    }

    // Call API to add expense
    await addExpense({ title, amount: parseFloat(amount), date, category });

    // Clear form fields
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");

    // Inform parent to refresh expense list
    if (onExpenseAdded) {
      onExpenseAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0.01"
        step="0.01"
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit">Add Expense</button>
    </form>
  );
}
