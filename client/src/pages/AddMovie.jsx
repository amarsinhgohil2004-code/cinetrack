import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MovieForm from "../components/MovieForm.jsx";
import { addMovie } from "../services/api.js";

export default function AddMovie() {
  const navigate = useNavigate();

  const handleSubmit = async (movie) => {
    try {
      await addMovie(movie);

      toast.success(`Added "${movie.name}" to your watchlist`);

      navigate("/");
    } catch (error) {
      console.error("Add movie error:", error);

      toast.error(error.response?.data?.message || "Failed to add movie");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Add a New Movie
        </h1>

        <p className="mt-2 text-slate-400">
          Fill in the details to add a movie to your CineTrack watchlist.
        </p>
      </div>

      <div className="mt-10">
        <MovieForm onSubmit={handleSubmit} submitLabel="Save Movie" />
      </div>
    </div>
  );
}
