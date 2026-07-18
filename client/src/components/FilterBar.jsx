import SearchBar from "./SearchBar.jsx";
import SortDropdown from "./SortDropdown.jsx";
import { FaUndo } from "react-icons/fa";

const GENRES = ["All", "Action", "Drama", "Comedy", "Sci-Fi", "Thriller", "Romance", "Horror", "Animation"];
const STATUSES = ["All", "Watched", "Unwatched"];

export default function FilterBar({
  search,
  setSearch,
  genre,
  setGenre,
  status,
  setStatus,
  sort,
  setSort,
  onReset,
}) {
  return (
    <div className="glass mt-8 rounded-2xl p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchBar value={search} onChange={setSearch} />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:items-center">
          <select
            className="input"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {GENRES.map((g) => (
              <option key={g} value={g} className="bg-card">
                {g === "All" ? "All Genres" : g}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-card">
                {s === "All" ? "All Status" : s}
              </option>
            ))}
          </select>

          <SortDropdown value={sort} onChange={setSort} />

          <button onClick={onReset} className="btn-secondary">
            <FaUndo /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
