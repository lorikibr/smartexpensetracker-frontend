import { useState } from "react";
import { deleteExpense, updateExpense } from "../api/expenseApi";

export default function ExpenseList({ expenses, onExpenseUpdated }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

  const categories = [
    "Food",
    "Transport",
    "Utilities",
    "Entertainment",
    "Health",
    "Other",
  ];

  const startEditing = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      title: expense.title,
      amount: expense.amount,
      // Format date to yyyy-mm-dd if needed
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
    onExpenseUpdated(); // fetch latest data
  };

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id} className="mb-2">
          {editingId === expense.id ? (
            <>
              <input
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
              <input
                type="number"
                value={editForm.amount}
                onChange={(e) =>
                  setEditForm({ ...editForm, amount: e.target.value })
                }
              />
              <input
                type="date"
                value={editForm.date}
                onChange={(e) =>
                  setEditForm({ ...editForm, date: e.target.value })
                }
              />
              <select
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <button onClick={handleUpdate}>Save</button>
              <button onClick={cancelEditing}>Cancel</button>
            </>
          ) : (
            <>
              {expense.title} - {expense.amount} MKD -{" "}
              {expense.date.slice(0, 10)} - {expense.category}{" "}
              <button onClick={() => startEditing(expense)}>Edit</button>
              <button
                onClick={async () => {
                  await deleteExpense(expense.id);
                  onExpenseUpdated(); // refresh list
                }}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
