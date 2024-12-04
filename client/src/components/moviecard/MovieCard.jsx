import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useUser } from '../../context/UserContext';
import './MovieCard.css';

const MovieCard = ({ movieId, year, title, info, isLiked: initialIsLiked = false, onUnlike }) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!user || !movieId) return;

      try {
        const response = await fetch(`/api/movies/check-like/${movieId}`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsLiked(data.isLiked);
        }
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkLikeStatus();
  }, [user, movieId]);

  const handleLikeClick = async () => {
    if (!user) {
      alert('Please sign in to like movies');
      return;
    }

    try {
      const response = await fetch(`/api/movies/${isLiked ? 'unlike' : 'like'}/${movieId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const newLikeState = !isLiked;
        setIsLiked(newLikeState);
        
        // If the movie was unliked and we're in the account page,
        // call the onUnlike callback to remove it from the display
        if (!newLikeState && onUnlike) {
          onUnlike(movieId);
        }
      } else {
        console.error('Failed to update like status');
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const readableDuration = moment.duration(info.running_time_secs, 'seconds').humanize();
  const fallbackImageUrl = 'https://via.placeholder.com/250x400?text=Movie+Poster';

  const handleImageError = (e) => {
    e.target.src = fallbackImageUrl;
  };

  return (
    <div className="moviebox">
      <img 
        id="movieimage" 
        src={info.image_url || fallbackImageUrl}
        onError={handleImageError}
        alt={title}
      />
      <div className="movietitle moviecontent">
        {title}
      </div>
      <div className="movieinfo moviecontent">
        <div>
          <span className="movieinfoheading">Rating:</span>
          <span className="movieinfodata">{info.rating}</span>
        </div>
        <div>
          <span className="movieinfoheading">Duration: </span>
          <span className="movieinfodata">{readableDuration}</span>
        </div>
      </div>
      <div className="moviebuttondiv moviecontent">
        <button className="moviebutton">
          <FontAwesomeIcon icon={faEye} /> View Movie
        </button>
        <button 
          className={`moviebutton ${isLiked ? 'liked' : ''}`} 
          id="right-button"
          onClick={handleLikeClick}
        >
          <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular} /> 
          {isLiked ? 'Unlike' : 'Like'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;