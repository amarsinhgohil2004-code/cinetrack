const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
} = require("../controllers/movieController");

// Get all movies & Add movie
router
    .route("/")
    .get(protect, getMovies)
    .post(protect, addMovie);

// Get, Update & Delete single movie
router
    .route("/:id")
    .get(protect, getMovieById)
    .put(protect, updateMovie)
    .delete(protect, deleteMovie);

module.exports = router;