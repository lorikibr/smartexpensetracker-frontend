import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getExpenses } from "../api/ExpenseApi";
import { getIncomeStats } from "../api/IncomeApi";
import { categories, months, COLORS } from "../Constants";

export default function DashboardPage() {
  // State to hold expense data from the API
  const [expenses, setExpenses] = useState([]);
  // State for total income and salary-specific income
  const [incomeStats, setIncomeStats] = useState({
    totalIncome: 0,
    totalSalaryIncome: 0,
  });
  // State for selected year and month filters
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  // State to store unique years from expenses for filtering options
  const [years, setYears] = useState([]);
  // State for loading status and error messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch data whenever selectedYear or selectedMonth changes
  useEffect(() => {
    fetchDashboardData();
  }, [selectedYear, selectedMonth]);

  // Function to fetch all dashboard-related data (expenses, income stats)
  const fetchDashboardData = async () => {
    setLoading(true); // Show loading indicator
    setError(null); // Clear previous errors
    try {
      const expenseData = await getExpenses(); // Get expenses
      setExpenses(expenseData);

      // Get unique years from expense data for the year filter dropdown
      const uniqueYears = [
        ...new Set(expenseData.map((e) => e.date.slice(0, 4))),
      ].sort((a, b) => b - a); // Sort years descending
      setYears(uniqueYears);

      // Get income statistics based on current filters
      const statsData = await getIncomeStats(selectedYear, selectedMonth);
      setIncomeStats(statsData);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(
        "Failed to load dashboard data. Please check your server and internet connection."
      );
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Filters expenses based on the selected year and month
  const filteredExpenses = expenses.filter((e) => {
    const expenseYear = e.date.slice(0, 4);
    const expenseMonth = e.date.slice(5, 7);
    return (
      (selectedYear === "all" || expenseYear === selectedYear) &&
      (selectedMonth === "all" ||
        expenseMonth === String(selectedMonth).padStart(2, "0"))
    );
  });

  // Calculates the total amount of filtered expenses
  const totalExpensesAmount = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  // Gets total income amounts, defaults to 0 if null
  const totalIncomeAmount = incomeStats.totalIncome || 0;
  const totalSalaryIncomeAmount = incomeStats.totalSalaryIncome || 0;

  // Calculates the net balance (income minus expenses)
  const netBalance = totalIncomeAmount - totalExpensesAmount;

  // Prepares data for the expense pie chart
  const expensePieChartData = categories
    .map((cat) => {
      // Sum expenses for each category
      const sum = filteredExpenses
        .filter((e) => e.category === cat)
        .reduce((acc, e) => acc + e.amount, 0);
      return {
        name: cat,
        value: sum,
        // Calculate percentage for the pie chart label
        percentage:
          totalExpensesAmount > 0
            ? ((sum / totalExpensesAmount) * 100).toFixed(1)
            : 0,
      };
    })
    .filter((d) => d.value > 0); // Only include categories with expenses

  // Displays a loading message
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-6rem)] text-xl text-gray-700">
        Loading financial data...
      </div>
    );
  }

  // Displays an error message if data fetching fails
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-6rem)] text-xl text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    // Main dashboard container with styling
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-lg mb-8 border border-gray-200">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 text-center">
        Dashboard
      </h1>

      {/* Filters Section for Year and Month */}
      <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-100 flex flex-wrap gap-4 items-center justify-center">
        <label
          htmlFor="year-select"
          className="font-semibold text-gray-700 text-base sm:text-lg"
        >
          Filter by:
        </label>
        <div className="relative">
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-base transition duration-150 ease-in-out"
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {/* Dropdown arrow SVG */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-base transition duration-150 ease-in-out"
          >
            {months.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {/* Dropdown arrow SVG */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Summary Cards: Displays key financial totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Expenses Card */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg text-center flex flex-col justify-between transform transition duration-200 hover:scale-[1.02]">
          <h2 className="text-xl font-semibold mb-2 text-red-600">
            Total Expenses
          </h2>
          <p className="text-4xl font-extrabold text-red-700">
            {totalExpensesAmount.toFixed(2)} MKD
          </p>
        </div>

        {/* Total Income Card */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg text-center flex flex-col justify-between transform transition duration-200 hover:scale-[1.02]">
          <h2 className="text-xl font-semibold mb-2 text-green-600">
            Total Income
          </h2>
          <p className="text-4xl font-extrabold text-green-700">
            {totalIncomeAmount.toFixed(2)} MKD
          </p>
          <p className="text-sm text-gray-500 mt-2">
            (Salary: {totalSalaryIncomeAmount.toFixed(2)} MKD)
          </p>
        </div>

        {/* Net Balance Card: Changes color based on positive/negative balance */}
        <div
          className={`p-6 border rounded-xl shadow-lg text-center flex flex-col justify-between transform transition duration-200 hover:scale-[1.02] ${
            netBalance >= 0
              ? "bg-blue-50 border-blue-200"
              : "bg-orange-50 border-orange-200"
          }`}
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Net Balance
          </h2>
          <p
            className={`text-4xl font-extrabold ${
              netBalance >= 0 ? "text-blue-700" : "text-orange-700"
            }`}
          >
            {netBalance.toFixed(2)} MKD
          </p>
        </div>
      </div>

      {/* Expense Breakdown Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Expense Breakdown by Category
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-around">
          {/* Shows pie chart if there's expense data, otherwise a message */}
          {expensePieChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={true}
                  data={expensePieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                >
                  {expensePieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-expense-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toFixed(2)} MKD`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-lg text-gray-600 text-center w-full py-10">
              No expenses to display for the selected period.
            </p>
          )}
        </div>
      </div>

      {/* Detailed Expense Breakdown List */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Detailed Expense Breakdown
        </h2>
        {/* Shows list if there's expense data, otherwise a message */}
        {expensePieChartData.length > 0 ? (
          <ul>
            {expensePieChartData.map(({ name, value, percentage }) => (
              <li
                key={name}
                className="flex justify-between items-center border-b border-gray-200 py-3 last:border-b-0"
              >
                <span className="font-medium text-gray-700 text-lg">
                  {name}
                </span>
                <span className="text-gray-800 text-lg">
                  {value.toFixed(2)} MKD (
                  <span className="font-semibold">{percentage}</span>%)
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600 text-center w-full py-10">
            No detailed expense breakdown for the selected period.
          </p>
        )}
      </div>
    </div>
  );
}
