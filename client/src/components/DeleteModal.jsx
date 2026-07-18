import { FaExclamationTriangle } from "react-icons/fa";

export default function DeleteModal({ open, movie, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="glass w-full max-w-md rounded-2xl p-6 shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-500/20 text-rose-400">
            <FaExclamationTriangle />
          </span>
          <div>
            <h3 className="text-lg font-semibold">Delete Movie?</h3>
            <p className="text-sm text-slate-400">
              Are you sure you want to delete
              {movie ? ` "${movie.name}"` : " this movie"}?
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn-primary bg-rose-500 hover:bg-rose-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
