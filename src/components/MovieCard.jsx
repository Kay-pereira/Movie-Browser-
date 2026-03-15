import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContexts';
import { useState } from "react";
import { Link } from 'react-router-dom'
import Genres from './Genres';
import MovieTrailer from './TrailerPlayer';

export default function MovieCard({ movie }) {
  const { AddtoFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const [showTrailer, setShowTrailer] = useState(false);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else AddtoFavorites(movie);
  }

  // IMPROVED: Better text flow and formatting
  function MovieOverview({ text }) {
    const [expanded, setExpanded] = useState(false);
    const maxLength = 120; // Slightly shorter for better card fit

    if (!text) return null;
    if (text.length <= maxLength) return <p className="overview-text">{text}</p>;

    return (
      <p className="overview-text">
        {expanded ? text : `${text.slice(0, maxLength)}... `}
        <Link to={`/movie/${movie.id}`}>
        <button 
          className="see-more-btn" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "See less" : "Read more"}
        </button>
        </Link>
      </p>
      
    );
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-icon-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
            title={favorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <span className="material-symbols-outlined">
              {favorite ? "favorite" : "heart_plus"}
            </span>
          </button>

          <button className="trailer-btn" onClick={() => setShowTrailer(true)}>
            ▶ Watch Trailer
          </button>
        </div>
      </div>

      <div className="movie-info">
        <div className="movie-header">
           <h3>{movie.title}</h3>
           <span className="movie-year">{movie.release_date?.split("-")[0]}</span>
        </div>

        <div className="movie-meta">
          <div className="rating-badge">
            <span className="material-symbols-outlined">star</span>
            {Number(movie.vote_average).toFixed(1)}
          </div>
          <Genres genreId={movie.genre_ids} />
        </div>

        <MovieOverview text={movie.overview} />
      </div>

      {/* Netflix-style Trailer Modal */}
      {showTrailer && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div
            className="trailer-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-trailer"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>

            <MovieTrailer movieId={movie.id} />
          </div>
        </div>
      )}
    </div>
  );
}