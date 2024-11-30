import React, { useEffect, useState } from 'react';
import './Home.css';
import MovieList from '../../components/movielist/MovieList';

const Home = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch('/api/movies/get-movies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await response.json();

        if (json.success) {
          setMoviesByGenre(json.movies);
        }
      } catch (err) {
        console.log('Something went wrong', err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="home-container">
      <ul>
        {Object.entries(moviesByGenre).map(([genre, movies]) => (
          <li key={genre}>
            <MovieList genre={genre} movies={movies} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
