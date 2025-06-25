import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

// Component to handle showing/hiding the Add Expense form
export default function AddExpenseSection({ onExpenseAdded }) {
  // State to control if the form is visible
  const [showForm, setShowForm] = useState(false);

  // Function to toggle the form's visibility
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="mb-4">
      {/* Button to show or hide the expense form */}
      <button
        onClick={toggleForm}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {showForm ? "Cancel" : "Add Expense"}
      </button>

      {/* Renders the ExpenseForm only if 'showForm' is true */}
      {showForm && (
        <div className="mt-4 p-4 border rounded shadow">
          <ExpenseForm
            onExpenseAdded={() => {
              onExpenseAdded(); // Call parent's function to refresh expense list
              setShowForm(false); // Hide the form after a successful addition
            }}
          />
        </div>
      )}
    </div>
  );
}
