import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { getExpenses } from "../api/expenseApi";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const categories = [
    "Food",
    "Transport",
    "Utilities",
    "Entertainment",
    "Health",
    "Other",
  ];

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesTitle = expense.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "" || expense.category === categoryFilter;
    return matchesTitle && matchesCategory;
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Expenses</h1>

      <input
        type="text"
        placeholder="Search by title"
        className="mb-4 p-2 border rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select
        className="mb-4 p-2 border rounded ml-2"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <ExpenseForm onExpenseAdded={fetchExpenses} />
      <ExpenseList
        expenses={filteredExpenses} // pass filtered expenses
        onExpenseUpdated={fetchExpenses}
      />
    </div>
  );
}
