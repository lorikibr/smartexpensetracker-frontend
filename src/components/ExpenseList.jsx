import { useState } from "react";
import { deleteExpense, updateExpense } from "../api/ExpenseApi";
import { categories } from "../Constants";

export default function ExpenseList({ expenses, onExpenseUpdated }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startEditing = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      title: expense.title,
      amount: expense.amount,
      date: expense.date?.slice(0, 10) || "",
      category: expense.category || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ title: "", amount: "", date: "", category: "" });
  };

  const handleUpdate = async () => {
    await updateExpense(editingId, {
      ...editForm,
      amount: parseFloat(editForm.amount),
    });
    cancelEditing();
    onExpenseUpdated();
  };

  // Pagination logic
  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-6">
      {/* Optional: Toggle Add Form Here */}
      {/* <button onClick={...}>Add Expense</button> */}

      <table className="min-w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.map((expense) => (
            <tr key={expense.id} className="border-b">
              <td className="p-2">
                {editingId === expense.id ? (
                  <input
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  expense.title
                )}
              </td>
              <td className="p-2">
                {editingId === expense.id ? (
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, amount: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  `${expense.amount} MKD`
                )}
              </td>
              <td className="p-2">
                {editingId === expense.id ? (
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, date: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  expense.date.slice(0, 10)
                )}
              </td>
              <td className="p-2">
                {editingId === expense.id ? (
                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
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
              <td className="p-2 space-x-2">
                {editingId === expense.id ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="text-green-600 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(expense)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        await deleteExpense(expense.id);
                        onExpenseUpdated();
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
