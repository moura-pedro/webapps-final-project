import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import MovieCard from '../../components/moviecard/MovieCard';
import './UserAccount.css';

const UserAccount = () => {
  const { user } = useUser();
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedMovies = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/movies/liked', {
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setLikedMovies(data.movies || []);
        } else {
          setError(data.message || 'Failed to fetch liked movies');
        }
      } catch (error) {
        console.error('Error fetching liked movies:', error);
        setError('Error loading liked movies');
      } finally {
        setLoading(false);
      }
    };

    fetchLikedMovies();
  }, [user]);

  const handleUnlike = (movieId) => {
    setLikedMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
  };

  if (!user) {
    return (
      <div className="account-page">
        <div className="account-container">
          <h2>Please sign in to view your account</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="account-page">
        <div className="account-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="account-page">
        <div className="account-container">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <h2>My Liked Movies</h2>
        <div className="movies-grid">
          {likedMovies.length === 0 ? (
            <p className="no-movies">You haven't liked any movies yet.</p>
          ) : (
            likedMovies.map((movie) => (
              <div key={movie._id} className="movie-item">
                <MovieCard
                  movieId={movie._id}
                  year={movie.year}
                  title={movie.title}
                  info={movie.info}
                  isLiked={true}
                  onUnlike={handleUnlike}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;