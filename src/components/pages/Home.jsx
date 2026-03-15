import { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import MovieCardSkeleton from "../../components/MovieCardSkeleton";
import { searchMovies, getPopularMovies, getMoviesByGenre } from "../../Services/api";
import '../../css/Home.css';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    // Paging and Genre states
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const genres = [
        { id: null, name: "All" },
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
        { id: 18, name: "Drama" },
        { id: 10749, name: "Romance" },
        { id: "romcom", name: "Rom-Com" }, // We'll handle this specially
        { id: 27, name: "Horror" },
        { id: 878, name: "Sci-Fi" },
    ];

    useEffect(() => {
        loadInitialMovies();
    }, []);

    // Initial load (Popular movies)
    const loadInitialMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPopularMovies(1);
            setMovies(data);
            setCurrentPage(1);
        } catch (err) {
            setError("Failed to load movies...");
        } finally {
            setLoading(false);
        }
    };

    const handleGenreClick = async (genreId) => {
        if (loading) return;
        setSearchQuery(""); // Clear search when filtering by genre
        setSelectedGenre(genreId);
        setLoading(true);
        setError(null);

        try {
            let data;
            if (genreId === null) {
                data = await getPopularMovies(1);
            } else if (genreId === "romcom") {
                // Rom-Com is usually Genre 10749 (Romance) + 35 (Comedy)
                data = await getMoviesByGenre("10749,35", 1);
            } else {
                data = await getMoviesByGenre(genreId, 1);
            }
            setMovies(data);
            setCurrentPage(1);
        } catch (err) {
            setError("Failed to filter by genre...");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim() || loading) return;

        setLoading(true);
        setSelectedGenre(null);
        setError(null);

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setCurrentPage(1);
        } catch (err) {
            setError("Search failed...");
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        if (loadingMore) return;
        setLoadingMore(true);
        const nextPage = currentPage + 1;

        try {
            let newMovies = [];
            if (selectedGenre === "romcom") {
                newMovies = await getMoviesByGenre("10749,35", nextPage);
            } else if (selectedGenre) {
                newMovies = await getMoviesByGenre(selectedGenre, nextPage);
            } else if (searchQuery) {
                // TMDB search paging works similarly if you update api.js to accept page
                newMovies = await searchMovies(searchQuery, nextPage);
            } else {
                newMovies = await getPopularMovies(nextPage);
            }

            setMovies(prev => [...prev, ...newMovies]);
            setCurrentPage(nextPage);
        } catch (err) {
            console.error("Load more error:", err);
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <div className="home-container">
            {/* SEARCH SECTION */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="Search-btn">
                    <span className="material-symbols-outlined">search</span> Search
                </button>
            </form>

            {/* GENRES BAR */}
            <div className="genres-bar">
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        className={`genre-btn ${selectedGenre === genre.id ? "active" : ""}`}
                        onClick={() => handleGenreClick(genre.id)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* MOVIES GRID */}
            <div className="home">
                <div className="movies-grid">
                    {loading ? (
                        [...Array(10)].map((_, i) => <MovieCardSkeleton key={i} />)
                    ) : (
                        movies.map((movie) => <MovieCard movie={movie} key={`${movie.id}-${Math.random()}`} />)
                    )}
                </div>

                {/* LOAD MORE BUTTON */}
                {!loading && movies.length > 0 && (
                    <div className="load-more-container">
                        <button
                            className="load-more-btn"
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                        >
                            {loadingMore ? <div className="btn-spinner"></div> : "Load More"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;