import MovieCard from "./MovieCard.jsx";
import { FaFilm } from "react-icons/fa";

export default function MovieGrid({ movies, onOpen, onDelete, onMarkWatched }) {
  if (!movies.length) {
    return (
      <div className="glass mt-6 flex flex-col items-center justify-center rounded-2xl p-16 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5">
          <FaFilm className="text-2xl text-slate-400" />
        </div>

        <h3 className="mt-4 text-lg font-semibold">No movies found</h3>

        <p className="mt-1 text-sm text-slate-400">
          Try adjusting filters, or add a new movie to your watchlist.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((m) => (
        <MovieCard
          key={m._id}
          movie={m}
          onOpen={onOpen}
          onDelete={onDelete}
          onMarkWatched={onMarkWatched}
        />
      ))}
    </div>
  );
}
