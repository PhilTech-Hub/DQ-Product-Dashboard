type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64"
    />
  );
}
