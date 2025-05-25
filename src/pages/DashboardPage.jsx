import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getExpenses } from "../api/ExpenseApi";
import { categories, months, COLORS } from "../Constants";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);

      // Extract unique years from expenses for the dropdown
      const uniqueYears = [
        ...new Set(data.map((e) => e.date.slice(0, 4))),
      ].sort();
      setYears(uniqueYears);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  // Filter expenses based on selected year and month
  const filteredExpenses = expenses.filter((e) => {
    const year = e.date.slice(0, 4);
    const month = e.date.slice(5, 7);
    return (
      (selectedYear === "all" || year === selectedYear) &&
      (selectedMonth === "all" || month === selectedMonth)
    );
  });

  // Calculate total of filtered expenses
  const totalAmount = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  // Prepare data for Pie chart
  const data = categories
    .map((cat) => {
      const sum = filteredExpenses
        .filter((e) => e.category === cat)
        .reduce((acc, e) => acc + e.amount, 0);
      return {
        name: cat,
        value: sum,
        percentage:
          totalAmount > 0 ? ((sum / totalAmount) * 100).toFixed(1) : 0,
      };
    })
    .filter((d) => d.value > 0); // Only show categories with expenses

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Year and Month Filters */}
      <div className="mb-4 flex gap-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded"
        >
          {months.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Total */}
      <div className="mb-4 text-lg font-semibold">
        Total Spent: {totalAmount.toFixed(2)} MKD
      </div>

      {/* Pie Chart */}
      <div className="flex flex-col md:flex-row items-center justify-around">
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percentage }) => `${name} (${percentage}%)`}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} MKD`} />
          <Legend />
        </PieChart>
      </div>

      {/* Category breakdown */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">By Category</h2>
        <ul>
          {data.map(({ name, value, percentage }) => (
            <li key={name} className="border-b py-2">
              <strong>{name}</strong>: {value.toFixed(2)} MKD ({percentage}%)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
