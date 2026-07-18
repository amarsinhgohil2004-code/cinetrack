import { FaStar, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, onOpen, onDelete, onMarkWatched }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => onOpen(movie)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-card shadow-soft transition hover:-translate-y-1 hover:border-white/20 hover:shadow-glow"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
        <img
          src={movie.poster}
          alt={movie.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/400x600/1E293B/EF4444?text=No+Poster+Available";
          }}
        />

        <span
          className={`badge absolute right-3 top-3 ${
            movie.status === "Watched"
              ? "bg-emerald-500/90 text-white"
              : "bg-amber-500/90 text-white"
          }`}
        >
          {movie.status}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold">{movie.name}</h3>

          <span className="flex items-center gap-1 text-sm text-amber-400">
            <FaStar />

            {Number(movie.rating).toFixed(1)}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
          <span className="badge bg-white/10 text-slate-200">
            {movie.genre}
          </span>

          <span>{movie.year}</span>
        </div>

        <div
          className="mt-4 flex items-center justify-between gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="btn-ghost"
            onClick={() => navigate(`/edit/${movie._id}`)}
          >
            <FaEdit />
            Edit
          </button>

          <button
            className="btn-ghost text-rose-300 hover:bg-rose-500/10 hover:text-rose-200"
            onClick={() => onDelete(movie)}
          >
            <FaTrash />
            Delete
          </button>

          {movie.status !== "Watched" && (
            <button
              className="btn-ghost text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200"
              onClick={() => onMarkWatched(movie)}
            >
              <FaCheck />
              Watched
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
