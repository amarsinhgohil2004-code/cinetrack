import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import MovieForm from "../components/MovieForm.jsx";
import { getMovieById, updateMovie } from "../services/api.js";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Movie Details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);

        setMovie(data);
      } catch (error) {
        console.error("Fetch movie error:", error);

        toast.error(error.response?.data?.message || "Movie not found");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // Update Movie
  const handleSubmit = async (updates) => {
    try {
      await updateMovie(id, updates);

      toast.success(`Updated "${updates.name}"`);

      navigate("/");
    } catch (error) {
      console.error("Update movie error:", error);

      toast.error(error.response?.data?.message || "Failed to update movie");
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center py-20 text-xl">Loading movie...</div>
    );
  }

  // Movie Not Found
  if (!movie) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Movie not found</h1>

        <p className="mt-2 text-slate-400">
          The movie you're trying to edit doesn't exist.
        </p>

        <Link to="/" className="btn-primary mt-6 inline-flex">
          Back to Watchlist
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Edit Movie
        </h1>

        <p className="mt-2 text-slate-400">
          Update the details for "{movie.name}".
        </p>
      </div>

      <div className="mt-10">
        <MovieForm
          initialValues={movie}
          onSubmit={handleSubmit}
          submitLabel="Update Movie"
        />
      </div>
    </div>
  );
}
