import React from 'react';
import MovieCard from '../moviecard/MovieCard';
import './MovieList.css';

const MovieList = ({genre, movies}) => {
    
    return (
    <div>
        <div className="titlediv">
            <div>{genre}</div>
            <hr id="titleline"/>
        </div>
        <div className="moviebox">
        <ul className="movielist">
            {movies.map((movie) =>(
                <li className="moviecard">
                    <MovieCard year={movie.year} title={movie.title} info={movie.info} className="moviecard"/>
                </li>
            ))}
        </ul>
        </div>
    </div>
    )
}

export default MovieList