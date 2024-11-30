import React from 'react';
import moment from 'moment'
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faEye, faHeart }from '@fortawesome/free-solid-svg-icons'
import './MovieCard.css';

const MovieCard = ({year, title, info}) => {
    const readableduration = moment.duration(info.running_time_secs, 'seconds').humanize()
  return (
    <div className="moviebox">
        <img id="movieimage" src={info.image_url ? info.image_url : "../../assets/movieplaceholder.svg"} alt="Not Found"></img>
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
          <span className="movieinfodata">{readableduration}</span>
          </div>
        </div>
        <div className="moviebuttondiv moviecontent">
            <button className="moviebutton">
              <FontAwesomeIcon icon={faEye} /> View Movie
              </button>
            <button className="moviebutton" id="right-button">
            <FontAwesomeIcon icon={faHeart} /> Add to Favorites
            </button>
        </div>
    </div>
  )
}

export default MovieCard