import { FaFilm, FaCheckCircle, FaHourglassHalf, FaStar } from "react-icons/fa";

function Card({ icon: Icon, label, value, accent }) {
  return (
    <div className="glass group rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <span
          className={`grid h-9 w-9 place-items-center rounded-xl ${accent} transition group-hover:scale-110`}
        >
          <Icon className="text-white" />
        </span>
      </div>
      <div className="mt-4 text-3xl font-bold tracking-tight">{value}</div>
    </div>
  );
}

export default function DashboardCards({ movies }) {
  const total = movies.length;
  const watched = movies.filter((m) => m.status === "Watched").length;
  const unwatched = total - watched;
  const avg =
    total === 0
      ? "0.0"
      : (movies.reduce((s, m) => s + Number(m.rating || 0), 0) / total).toFixed(1);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card icon={FaFilm} label="Total Movies" value={total} accent="bg-brand" />
      <Card icon={FaCheckCircle} label="Watched" value={watched} accent="bg-emerald-500" />
      <Card icon={FaHourglassHalf} label="Unwatched" value={unwatched} accent="bg-amber-500" />
      <Card icon={FaStar} label="Average Rating" value={avg} accent="bg-indigo-500" />
    </div>
  );
}
