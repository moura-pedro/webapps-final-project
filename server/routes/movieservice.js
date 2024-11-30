const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Register route
router.get('/get-movies', async (req, res) => {
    const moviesbygenre = {}
    // fetch all movies from database
    const result = Movie.find()
    await result.cursor().forEach((movie) => {
        if (movie.info.genres !== undefined) {
            const genres = movie.info.genres
            for (let i = 0; i < genres.length; i++) {
                if (moviesbygenre[genres[i]] === undefined) {
                    // if new genre make new list
                    moviesbygenre[genres[i]] = []
                }
                if (moviesbygenre[genres[i]].length < 10) {
                    moviesbygenre[genres[i]].push(movie)
                }
            }
        }
    })

    res.json({
        movies: moviesbygenre,
        success: true
    })
});

// router for favorite movies
module.exports = router;