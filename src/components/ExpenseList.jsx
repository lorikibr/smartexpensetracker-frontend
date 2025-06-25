import { useState } from "react";
import { deleteExpense, updateExpense } from "../api/ExpenseApi";
import { categories } from "../Constants"; // Used for the category dropdown in edit mode

export default function ExpenseList({ expenses, onExpenseUpdated }) {
  // State to manage which expense is currently being edited
  const [editingId, setEditingId] = useState(null);
  // State to hold the form data for the expense being edited
  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to show per page

  // Sets up the form with current expense data when editing starts
  const startEditing = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      title: expense.title,
      amount: expense.amount,
      date: expense.date?.slice(0, 10) || "", // Formats date for input field
      category: expense.category || "",
    });
  };

  // Clears the edit form and stops editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ title: "", amount: "", date: "", category: "" });
  };

  // Handles updating an expense via API
  const handleUpdate = async () => {
    // Basic checks before sending update
    if (!editForm.title.trim()) {
      console.error("Title cannot be empty.");
      return;
    }
    if (
      !editForm.amount ||
      isNaN(editForm.amount) ||
      parseFloat(editForm.amount) <= 0
    ) {
      console.error("Amount must be a valid positive number.");
      return;
    }
    if (!editForm.date) {
      console.error("Date is required.");
      return;
    }
    if (!editForm.category) {
      console.error("Category is required.");
      return;
    }

    try {
      // Call API to update the expense
      await updateExpense(editingId, {
        ...editForm,
        amount: parseFloat(editForm.amount), // Convert amount to number
      });
      cancelEditing(); // Hide edit form after successful update
      onExpenseUpdated(); // Tell parent component to refresh list
    } catch (error) {
      console.error("Error updating expense:", error);
      // Could show an error message to the user
    }
  };

  // --- Pagination Logic ---
  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstItem, indexOfLastItem); // Expenses shown on current page

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Your Expense Records
      </h2>
      {expenses.length === 0 && !editingId ? (
        // Message shown if no expenses are available
        <p className="text-gray-600 text-center py-4">
          No expense records available. Add some!
        </p>
      ) : (
        <>
          {/* Table to display expenses */}
          <table className="min-w-full text-left border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  Title
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  Amount
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  Date
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  Category
                </th>
                <th className="py-3 px-6 text-center border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentExpenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {/* Title Column: Shows input if editing, else plain text */}
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {editingId === expense.id ? (
                      <input
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      expense.title
                    )}
                  </td>
                  {/* Amount Column: Shows input if editing, else formatted amount */}
                  <td className="py-3 px-6 text-left">
                    {editingId === expense.id ? (
                      <input
                        type="number"
                        value={editForm.amount}
                        onChange={(e) =>
                          setEditForm({ ...editForm, amount: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0.01"
                        step="0.01"
                      />
                    ) : (
                      `${
                        expense.amount ? expense.amount.toFixed(2) : "0.00"
                      } MKD`
                    )}
                  </td>
                  {/* Date Column: Shows date input if editing, else formatted date */}
                  <td className="py-3 px-6 text-left">
                    {editingId === expense.id ? (
                      <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) =>
                          setEditForm({ ...editForm, date: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : expense.date ? (
                      expense.date.slice(0, 10)
                    ) : (
                      "N/A"
                    )}
                  </td>
                  {/* Category Column: Shows dropdown if editing, else plain text */}
                  <td className="py-3 px-6 text-left">
                    {editingId === expense.id ? (
                      <select
                        value={editForm.category}
                        onChange={(e) =>
                          setEditForm({ ...editForm, category: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    ) : (
                      expense.category
                    )}
                  </td>
                  {/* Actions Column: Edit/Delete buttons or Save/Cancel buttons */}
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      {editingId === expense.id ? (
                        <>
                          {/* Save button for editing */}
                          <button
                            onClick={handleUpdate}
                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-150 ease-in-out text-xs"
                          >
                            Save
                          </button>
                          {/* Cancel button for editing */}
                          <button
                            onClick={cancelEditing}
                            className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-150 ease-in-out text-xs"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Edit button */}
                          <button
                            onClick={() => startEditing(expense)}
                            className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out text-xs"
                          >
                            Edit
                          </button>
                          {/* Delete button */}
                          <button
                            onClick={async () => {
                              try {
                                await deleteExpense(expense.id);
                                onExpenseUpdated(); // Refresh expense list after deletion
                              } catch (error) {
                                console.error(
                                  `Error deleting expense with ID ${expense.id}:`,
                                  error
                                );
                                // Handle deletion error (e.g., show notification)
                              }
                            }}
                            className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out text-xs"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && ( // Only show if more than one page
            <div className="mt-4 flex justify-between items-center px-4 py-2 bg-gray-50 rounded-b-lg border-t border-gray-200">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
              >
                Previous
              </button>

              <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
