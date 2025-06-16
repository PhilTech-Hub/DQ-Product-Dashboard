// Define the props type for the SearchBar component
type SearchBarProps = {
  value: string;                      // Current value of the search input
  onChange: (value: string) => void; // Callback function to handle input changes
};

// Functional component for a search input field
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={value || ''} // Prevent uncontrolled input by defaulting to empty string
      onChange={(e) => onChange(e.target.value)} // Invoke parent callback on input change
      className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64" // Responsive and styled input field
    />
  );
}
