import { useState } from "react";
import { createIncome } from "../api/IncomeApi";

// Form component for adding a new income record
function IncomeForm({ onIncomeAdded }) {
  // States for form input fields
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input checks
    if (!source.trim()) {
      console.error("Source is required.");
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

    try {
      // Create income object and send to API
      const income = { source, amount: parseFloat(amount), date };
      await createIncome(income);

      // Clear form fields after successful add
      setSource("");
      setAmount("");
      setDate("");

      // Tell the parent component a new income was added
      if (onIncomeAdded) {
        onIncomeAdded();
      }
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  return (
    // Outer container for styling the form section
    <div className="p-8 bg-gray-50 min-h-screen flex items-start justify-center font-sans">
      <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 w-full max-w-xl">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
          Add New Income Record
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Income Source Input */}
          <div>
            <label
              htmlFor="income-source"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Income Source
            </label>
            <input
              id="income-source"
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g., Salary, Freelance, Gift"
              required
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base placeholder-gray-400"
            />
          </div>
          {/* Amount Input */}
          <div>
            <label
              htmlFor="income-amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount (MKD)
            </label>
            <input
              id="income-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 1000.00"
              required
              min="0.01"
              step="0.01"
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base placeholder-gray-400"
            />
          </div>
          {/* Date Input */}
          <div>
            <label
              htmlFor="income-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date Received
            </label>
            <input
              id="income-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 mt-6 border border-transparent rounded-lg shadow-md text-xl font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
          >
            Add Income
          </button>
        </form>
      </div>
    </div>
  );
}

export default IncomeForm;
