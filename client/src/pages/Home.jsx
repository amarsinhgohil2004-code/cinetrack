import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus, FaListUl, FaFilm } from "react-icons/fa";

import DashboardCards from "../components/DashboardCards.jsx";
import FilterBar from "../components/FilterBar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import MovieDetailsModal from "../components/MovieDetailsModal.jsx";
import DeleteModal from "../components/DeleteModal.jsx";

import { getMovies, updateMovie, deleteMovie } from "../services/api.js";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("newest");

  const [selected, setSelected] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  // ===============================
  // Fetch Movies From Backend
  // ===============================
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();

        setMovies(data);
      } catch (error) {
        console.error(error);

        toast.error(error.response?.data?.message || "Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const resetFilters = () => {
    setSearch("");
    setGenre("All");
    setStatus("All");
    setSort("newest");
  };

  // ===============================
  // Filter + Sort Movies
  // ===============================
  const filtered = useMemo(() => {
    let list = [...movies];

    if (search.trim()) {
      list = list.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (genre !== "All") {
      list = list.filter((m) => m.genre === genre);
    }

    if (status !== "All") {
      list = list.filter((m) => m.status === status);
    }

    switch (sort) {
      case "oldest":
        list.sort((a, b) => a.year - b.year);

        break;

      case "rating-desc":
        list.sort((a, b) => b.rating - a.rating);

        break;

      case "rating-asc":
        list.sort((a, b) => a.rating - b.rating);

        break;

      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));

        break;

      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name));

        break;

      default:
        list.sort((a, b) => b.year - a.year);
    }

    return list;
  }, [movies, search, genre, status, sort]);

  // ===============================
  // Mark Movie Watched
  // ===============================
  const handleMarkWatched = async (movie) => {
    try {
      const updatedMovie = await updateMovie(movie._id, {
        status: "Watched",
      });

      setMovies((prev) =>
        prev.map((m) => (m._id === movie._id ? updatedMovie : m)),
      );

      toast.success(`Marked "${movie.name}" as watched`);
    } catch (error) {
      console.error(error);

      toast.error("Failed to update movie");
    }
  };

  // ===============================
  // Delete Movie
  // ===============================
  const confirmDelete = async () => {
    if (!toDelete) return;

    try {
      await deleteMovie(toDelete._id);

      setMovies((prev) => prev.filter((m) => m._id !== toDelete._id));

      toast.info(`Deleted "${toDelete.name}"`);

      setToDelete(null);
      setSelected(null);
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete movie");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-xl">Loading movies...</div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-16 pt-10">
      {/* Hero */}

      <section className="glass relative overflow-hidden rounded-3xl p-8 md:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <span className="badge bg-white/10 text-slate-300">
              <FaFilm className="mr-1.5 text-brand" />
              Personal Watchlist
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Track every movie <br />
              <span className="text-brand">you love.</span>
            </h1>

            <p className="mt-4 max-w-lg text-slate-400">
              Organize your personal movie collection with ratings, genres and
              watch status. A clean dashboard for cinephiles.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/add" className="btn-primary">
                <FaPlus />
                Add Movie
              </Link>

              <a href="#watchlist" className="btn-secondary">
                <FaListUl />
                View Watchlist
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto grid max-w-sm grid-cols-3 gap-3">
              {movies.slice(0, 6).map((m, i) => (
                <div
                  key={m._id}
                  className={`aspect-[2/3] overflow-hidden rounded-xl border border-white/10 shadow-soft ${
                    i % 2 === 0 ? "translate-y-3" : "-translate-y-3"
                  }`}
                >
                  <img
                    src={m.poster}
                    alt={m.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard */}

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">Overview</h2>

        <DashboardCards movies={movies} />
      </section>

      {/* Watchlist */}

      <section id="watchlist" className="mt-10 scroll-mt-24">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">Your Watchlist</h2>

            <p className="text-sm text-slate-400">
              {filtered.length} of {movies.length} movies
            </p>
          </div>
        </div>

        <FilterBar
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          status={status}
          setStatus={setStatus}
          sort={sort}
          setSort={setSort}
          onReset={resetFilters}
        />

        <MovieGrid
          movies={filtered}
          onOpen={setSelected}
          onDelete={setToDelete}
          onMarkWatched={handleMarkWatched}
        />
      </section>

      <MovieDetailsModal
        open={!!selected}
        movie={selected}
        onClose={() => setSelected(null)}
        onDelete={(m) => setToDelete(m)}
      />

      <DeleteModal
        open={!!toDelete}
        movie={toDelete}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
