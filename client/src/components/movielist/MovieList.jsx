import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MovieCard from '../moviecard/MovieCard';
import './MovieList.css';

const MovieList = ({genre, movies}) => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        const scrollAmount = 300; // Adjust this value to control scroll distance
        
        if (container) {
            const newScrollPosition = direction === 'left' 
                ? container.scrollLeft - scrollAmount 
                : container.scrollLeft + scrollAmount;
                
            container.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="genre-section">
            <div className="titlediv">
                <div>Top Rated in {genre}</div>
                <hr id="titleline"/>
            </div>
            <div className="movielist-container">
                <button 
                    className="scroll-button left-button"
                    onClick={() => scroll('left')}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                
                <div className="moviebox-list" ref={scrollContainerRef}>
                    <ul className="movielist">
                        {movies.map((movie, index) =>(
                            <li key={movie._id} className="moviecard">
                                <MovieCard 
                                    movieId={movie._id}
                                    year={movie.year} 
                                    title={movie.title} 
                                    info={movie.info}
                                />
                                <div className="movie-rank">#{index + 1}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                <button 
                    className="scroll-button right-button"
                    onClick={() => scroll('right')}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default MovieList;