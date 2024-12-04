const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const User = require('../models/User');

// Middleware to check if user is authenticated
const requireAuth = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  try {
    const user = await User.findById(sessionId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid session' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


router.get('/check-like/:movieId', requireAuth, async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = req.user;

    const isLiked = user.favoriteMovies.includes(movieId);

    res.json({
      success: true,
      isLiked
    });
  } catch (error) {
    console.error('Error checking like status:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking like status'
    });
  }
});
  
    // Like a movie
  router.post('/like/:movieId', requireAuth, async (req, res) => {
    try {
      const { movieId } = req.params;
      const user = req.user;
  
      console.log('Like request for movie:', movieId);
      console.log('Current user favorites:', user.favoriteMovies);
  
      // Check if movie exists
      const movie = await Movie.findById(movieId);
      if (!movie) {
        console.log('Movie not found:', movieId);
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }
  
      // Check if already liked
      if (user.favoriteMovies.includes(movieId)) {
        console.log('Movie already liked');
        return res.status(400).json({ success: false, message: 'Movie already liked' });
      }
  
      // Add to favorites
      user.favoriteMovies.push(movieId);
      await user.save();
      
      console.log('Updated user favorites:', user.favoriteMovies);
  
      res.json({ success: true, message: 'Movie liked successfully' });
    } catch (error) {
      console.error('Like movie error:', error);
      res.status(500).json({ success: false, message: 'Error liking movie' });
    }
  });
  
  // Update the get liked movies endpoint
  router.get('/liked', requireAuth, async (req, res) => {
    try {
      console.log('Fetching liked movies for user:', req.user._id);
      const user = await User.findById(req.user._id).populate('favoriteMovies');
      console.log('Found liked movies:', user.favoriteMovies);
      
      res.json({ 
        success: true, 
        movies: user.favoriteMovies 
      });
    } catch (error) {
      console.error('Get liked movies error:', error);
      res.status(500).json({ success: false, message: 'Error fetching liked movies' });
    }
  });

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

router.post('/unlike/:movieId', requireAuth, async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = req.user;

    console.log('Unliking movie:', movieId);
    console.log('Current favorites:', user.favoriteMovies);

    // Remove movie from favorites
    user.favoriteMovies = user.favoriteMovies.filter(
      (id) => id.toString() !== movieId.toString()  // Convert both to strings for comparison
    );

    await user.save();
    console.log('Updated favorites:', user.favoriteMovies);

    res.json({ 
      success: true, 
      message: 'Movie unliked successfully' 
    });
  } catch (error) {
    console.error('Unlike movie error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error unliking movie' 
    });
  }
});

// router for favorite movies
module.exports = router;