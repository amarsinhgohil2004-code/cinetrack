const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Movie name is required"],
            trim: true,
        },

        genre: {
            type: String,
            required: [true, "Genre is required"],
            enum: [
                "Action",
                "Drama",
                "Comedy",
                "Sci-Fi",
                "Thriller",
                "Romance",
                "Horror",
                "Animation",
            ],
        },

        year: {
            type: Number,
            required: [true, "Release year is required"],
            min: 1900,
            max: 2100,
        },

        rating: {
            type: Number,
            default: 7.5,
            min: 0,
            max: 10,
        },

        status: {
            type: String,
            enum: ["Watched", "Unwatched"],
            default: "Unwatched",
        },

        poster: {
            type: String,
            default: "",
            trim: true,
        },

        // Movie Owner
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Movie", movieSchema);