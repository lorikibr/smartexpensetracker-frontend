import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import CategoryFilter from "../components/CategoryFilter";
import { getExpenses } from "../api/ExpenseApi";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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

      <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />

      <ExpenseForm onExpenseAdded={fetchExpenses} />
      <ExpenseList
        expenses={filteredExpenses}
        onExpenseUpdated={fetchExpenses}
      />
    </div>
  );
}
