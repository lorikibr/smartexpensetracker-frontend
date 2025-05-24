import React from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Smart Expense Tracker</h1>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}
