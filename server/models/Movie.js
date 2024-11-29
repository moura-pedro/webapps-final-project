const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        trim: true,
        minlength: 3
    },
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: false
    },
    info: {
        type: {},
        required: true,
    },
}, {
    timestamps: true
});

// Ensure uniqueness if movies and title match.
movieSchema.index({year: 1, title: 1}, {unique: true})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;