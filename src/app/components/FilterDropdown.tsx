// Define the expected prop types for the FilterDropdown component
type FilterDropdownProps = {
  categories: string[]; // Array of available product categories
  selected: string;     // Currently selected category value
  onChange: (value: string) => void; // Callback to handle category selection change
};

// Functional component to render a dropdown for filtering products by category
export default function FilterDropdown({
  categories,
  selected,
  onChange,
}: FilterDropdownProps) {
  return (
    <select
      value={selected} // Controlled component: value comes from parent state
      onChange={(e) => onChange(e.target.value)} // Call the parent handler on change
      className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64" // Tailwind styles for border, spacing, and responsive width
    >
      {/* Default option to reset or show all categories */}
      <option value="">All Categories</option>

      {/* Dynamically render each category as a selectable option */}
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
