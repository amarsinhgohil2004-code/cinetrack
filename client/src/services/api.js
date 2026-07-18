import axios from "axios";

// ===============================
// Axios Instance
// ===============================
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// Add JWT Token Automatically
// ===============================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ===============================
// Authentication APIs
// ===============================

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = (userData) => {
  return api.post("/auth/login", userData);
};

// ===============================
// Movie APIs
// ===============================

// Get All Movies
export const getMovies = async () => {
  const { data } = await api.get("/movies");
  return data.movies;
};

// Get Single Movie
export const getMovieById = async (id) => {
  const { data } = await api.get(`/movies/${id}`);
  return data.movie;
};

// Add Movie
export const addMovie = async (movieData) => {
  const { data } = await api.post("/movies", movieData);
  return data.movie;
};

// Update Movie
export const updateMovie = async (id, movieData) => {
  const { data } = await api.put(`/movies/${id}`, movieData);
  return data.movie;
};

// Delete Movie
export const deleteMovie = async (id) => {
  const { data } = await api.delete(`/movies/${id}`);
  return data;
};

export default api;