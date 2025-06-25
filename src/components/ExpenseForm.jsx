import React, { useState } from "react";
import { addExpense } from "../api/ExpenseApi";
import { categories } from "../Constants"; // List of expense categories

// Form component for adding a new expense
export default function ExpenseForm({ onExpenseAdded }) {
  // States for form input fields
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop default form refresh

    // Basic input checks
    if (!title.trim()) {
      console.error("Title is required.");
      return;
    }
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      console.error("Please enter a valid positive amount.");
      return;
    }
    if (!date) {
      console.error("Date is required.");
      return;
    }
    if (!category) {
      console.error("Please select a category.");
      return;
    }

    try {
      // Send expense data to the API
      await addExpense({ title, amount: parseFloat(amount), date, category });

      // Clear the form fields after successful add
      setTitle("");
      setAmount("");
      setDate("");
      setCategory("");

      // Tell the parent component that a new expense was added
      if (onExpenseAdded) {
        onExpenseAdded();
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      // Could show a message to the user here
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100 mb-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Add New Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title input field */}
        <div>
          <label
            htmlFor="expense-title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="expense-title"
            type="text"
            placeholder="e.g., Groceries, Rent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Amount input field */}
        <div>
          <label
            htmlFor="expense-amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount (MKD)
          </label>
          <input
            id="expense-amount"
            type="number"
            placeholder="e.g., 50.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Date input field */}
        <div>
          <label
            htmlFor="expense-date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            id="expense-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Category select dropdown */}
        <div>
          <label
            htmlFor="expense-category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="expense-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
