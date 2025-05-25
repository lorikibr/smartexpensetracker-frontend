import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import Expenses from "./pages/ExpensePage";

export default function App() {
  return (
    <>
      <nav className="p-4 bg-gray-200 flex space-x-4">
        <Link to="/" className="font-semibold text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link
          to="/expenses"
          className="font-semibold text-blue-600 hover:underline"
        >
          Expenses
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </>
  );
}
