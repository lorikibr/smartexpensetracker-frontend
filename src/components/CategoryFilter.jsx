import { categories } from "../Constants";

export default function CategoryFilter({
  value,
  onChange,
  includeAllOption = true,
}) {
  return (
    <select
      className="mb-4 p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {includeAllOption && <option value="">All Categories</option>}
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
