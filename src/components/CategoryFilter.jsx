import { categories } from "../Constants";

// Component for filtering items by category
export default function CategoryFilter({
  value, // Current selected category
  onChange, // Function to call when category changes
  includeAllOption = true, //Option to include all categories
}) {
  return (
    <select
      className="mb-4 p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {/* Option to select all categories, shown if includeAllOption is true */}
      {includeAllOption && <option value="">All Categories</option>}
      {/* Map through the list of categories to create dropdown options */}
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
