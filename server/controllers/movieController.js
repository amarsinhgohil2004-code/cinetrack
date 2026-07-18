const Movie = require("../models/Movie");

// ==========================
// Add Movie
// POST /api/movies
// ==========================
const addMovie = async (req, res) => {
    try {
        const { name, genre, year, rating, status, poster } = req.body;

        if (!name || !genre || !year) {
            return res.status(400).json({
                success: false,
                message: "Movie name, genre and year are required",
            });
        }

        const movie = await Movie.create({
            name,
            genre,
            year,
            rating,
            status,
            poster,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Movie added successfully",
            movie,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// ==========================
// Get All Movies
// GET /api/movies
// ==========================
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: movies.length,
            movies,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// ==========================
// Get Single Movie
// GET /api/movies/:id
// ==========================
const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        res.status(200).json({
            success: true,
            movie,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// ==========================
// Update Movie
// PUT /api/movies/:id
// ==========================
const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            movie: updatedMovie,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// ==========================
// Delete Movie
// DELETE /api/movies/:id
// ==========================
const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        await movie.deleteOne();

        res.status(200).json({
            success: true,
            message: "Movie deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    addMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
};