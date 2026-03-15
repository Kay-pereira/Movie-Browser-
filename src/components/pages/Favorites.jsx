import { useState } from 'react'; // Added useState
import '../../css/Favorites.css';
import { useMovieContext } from '../../contexts/MovieContexts';
import MovieCard from '../MovieCard';

function Favorites() {
    const { favorites } = useMovieContext();
    const [searchQuery, setSearchQuery] = useState(""); // Define searchQuery

    // If favorites is empty or undefined
    if (!favorites || favorites.length === 0) {
        return (
            <div className="favorites-empty">
                <h2>No Favorite Movies Yet</h2>
                <p>Start adding movies to see them here!</p>
            </div>
        );
    }

    // Filter favorites based on search
    const filteredFavorites = favorites.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="favorites">
            <div className="favorites-header">
                <h2>Your Favorites</h2>
                <input
                    type="text"
                    placeholder="Search your favorites..."
                    className="favorites-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="movies-grid">
                {filteredFavorites.length > 0 ? (
                    filteredFavorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))
                ) : (
                    <p className="no-results">No favorites match that search.</p>
                )}
            </div>
        </div>
    );
}

export default Favorites;