import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm"; // This component seems unused but is imported.
import ExpenseList from "../components/ExpenseList";
import CategoryFilter from "../components/CategoryFilter";
import { getExpenses } from "../api/ExpenseApi";
import AddExpenseSection from "../components/AddExpenseSection";
import { categories } from "../Constants"; // This import seems unused but is imported.

export default function ExpensePage() {
  // State to hold all expenses
  const [expenses, setExpenses] = useState([]);
  // State for searching expenses by title
  const [searchQuery, setSearchQuery] = useState("");
  // State for filtering expenses by category
  const [categoryFilter, setCategoryFilter] = useState("");

  // Function to get expenses from the API
  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Fetch expenses when the page first loads
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Filter expenses based on search query and category
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

      {/* Input for searching expenses by title */}
      <input
        type="text"
        placeholder="Search by title"
        className="mb-4 p-2 border rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Component for filtering by category */}
      <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />

      {/* Section to add new expenses, re-fetches expenses after adding */}
      <AddExpenseSection onExpenseAdded={fetchExpenses} />
      {/* List of filtered expenses, allows updating expenses */}
      <ExpenseList
        expenses={filteredExpenses}
        onExpenseUpdated={fetchExpenses}
      />
    </div>
  );
}
