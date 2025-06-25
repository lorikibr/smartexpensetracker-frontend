import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/DashboardPage";
import Expenses from "./pages/ExpensePage";
import Income from "./pages/IncomePage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* Main navigation bar */}
      <nav className="bg-white shadow-md py-4 px-8 flex items-center justify-center space-x-8">
        <Link
          to="/"
          className="relative text-lg font-medium text-gray-700 hover:text-blue-600 transition duration-200 ease-in-out group"
        >
          Dashboard
          {/* Underline effect on hover */}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
        </Link>

        <Link
          to="/expenses"
          className="relative text-lg font-medium text-gray-700 hover:text-blue-600 transition duration-200 ease-in-out group"
        >
          Expenses
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
        </Link>

        <Link
          to="/income"
          className="relative text-lg font-medium text-gray-700 hover:text-blue-600 transition duration-200 ease-in-out group"
        >
          Income
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
        </Link>
      </nav>

      {/* Main content display area */}
      <main className="container mx-auto mt-8 px-4">
        {/* Defines routes for different pages */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/income" element={<Income />} />
          {/* Displays a 'Page Not Found' for unmatched routes */}
          <Route
            path="*"
            element={
              <div className="p-8 text-center text-gray-700 text-2xl font-semibold">
                Page Not Found
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
