import { FaStar, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MovieDetailsModal({ open, movie, onClose, onDelete }) {
  const navigate = useNavigate();

  if (!open || !movie) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass relative w-full max-w-3xl overflow-hidden rounded-3xl shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white transition hover:bg-black/70"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-[2/3] bg-slate-800 md:aspect-auto">
            <img
              src={movie.poster}
              alt={movie.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x900/1E293B/EF4444?text=No+Poster+Available";
              }}
            />
          </div>

          <div className="flex flex-col p-6 md:p-8">
            <span
              className={`badge w-fit ${
                movie.status === "Watched"
                  ? "bg-emerald-500/90 text-white"
                  : "bg-amber-500/90 text-white"
              }`}
            >
              {movie.status}
            </span>

            <h2 className="mt-3 text-2xl font-bold">{movie.name}</h2>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span className="badge bg-white/10 text-slate-200">
                {movie.genre}
              </span>

              <span>{movie.year}</span>

              <span className="flex items-center gap-1 text-amber-400">
                <FaStar />

                {Number(movie.rating).toFixed(1)}
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="label">Genre</dt>

                <dd>{movie.genre}</dd>
              </div>

              <div>
                <dt className="label">Release Year</dt>

                <dd>{movie.year}</dd>
              </div>

              <div>
                <dt className="label">Rating</dt>

                <dd>{Number(movie.rating).toFixed(1)} / 10</dd>
              </div>

              <div>
                <dt className="label">Status</dt>

                <dd>{movie.status}</dd>
              </div>
            </dl>

            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <button
                className="btn-primary"
                onClick={() => {
                  onClose();

                  navigate(`/edit/${movie._id}`);
                }}
              >
                <FaEdit />
                Edit
              </button>

              <button
                className="btn-secondary text-rose-300"
                onClick={() => onDelete(movie)}
              >
                <FaTrash />
                Delete
              </button>

              <button className="btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
