type FilterDropdownProps = {
  categories: string[];
  selected: string;
  onChange: (value: string) => void;
};

export default function FilterDropdown({
  categories,
  selected,
  onChange,
}: FilterDropdownProps) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
