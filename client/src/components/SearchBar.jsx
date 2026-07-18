import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        className="input pl-11"
        placeholder="Search movies by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
