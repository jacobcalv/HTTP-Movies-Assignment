import React, {useState} from 'react';
import UpdateMovie from './UpdateMovie'
import {Link} from 'react-router-dom'

const MovieCard = props => {
  const { id, title, director, metascore, stars } = props.movie;

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <Link to={`/update-movie/${id}`}>Edit</Link>
    </div>
  );
};

export default MovieCard;
