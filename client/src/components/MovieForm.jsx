import { useState } from "react";
import { FaSave } from "react-icons/fa";

const GENRES = ["Action", "Drama", "Comedy", "Sci-Fi", "Thriller", "Romance", "Horror", "Animation"];
const STATUSES = ["Watched", "Unwatched"];

export default function MovieForm({ initialValues, onSubmit, submitLabel = "Save Movie" }) {
  const [form, setForm] = useState(
    initialValues || {
      name: "",
      genre: "Action",
      year: new Date().getFullYear(),
      rating: 7.5,
      status: "Unwatched",
      poster: "",
    }
  );

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit({
      ...form,
      year: Number(form.year),
      rating: Number(form.rating),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass mx-auto w-full max-w-2xl rounded-3xl p-8 shadow-soft"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">Movie Name</label>
          <input
            className="input"
            placeholder="e.g. Inception"
            value={form.name}
            onChange={set("name")}
            required
          />
        </div>

        <div>
          <label className="label">Genre</label>
          <select className="input" value={form.genre} onChange={set("genre")}>
            {GENRES.map((g) => (
              <option key={g} value={g} className="bg-card">
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Release Year</label>
          <input
            type="number"
            min="1900"
            max="2100"
            className="input"
            value={form.year}
            onChange={set("year")}
          />
        </div>

        <div>
          <label className="label">Rating (0–10)</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            className="input"
            value={form.rating}
            onChange={set("rating")}
          />
        </div>

        <div>
          <label className="label">Status</label>
          <select className="input" value={form.status} onChange={set("status")}>
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-card">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="label">Poster URL</label>
          <input
            className="input"
            placeholder="https://..."
            value={form.poster}
            onChange={set("poster")}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-8 w-full py-3 text-base">
        <FaSave /> {submitLabel}
      </button>
    </form>
  );
}
