import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { getExpenses } from "./api/expenseApi"; // optional: you can use your helper function

export default function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses(); // using helper from expenseApi
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Smart Expense Tracker</h1>
      <ExpenseForm onExpenseAdded={fetchExpenses} />
      <ExpenseList expenses={expenses} />{" "}
    </div>
  );
}
