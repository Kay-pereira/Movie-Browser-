import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/MovieDetail.css";
import MovieTrailer from "./TrailerPlayer";

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const fetchFullDetails = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=cf9ed83f24d3f89dce4e9a7f4b637ea3&append_to_response=credits,recommendations,watch/providers`
                );
                if (!res.ok) throw new Error("Failed to fetch movie details.");
                const data = await res.json();
                setMovie(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFullDetails();
        // Scroll to top whenever the ID changes (useful for recommendations)
        window.scrollTo(0, 0);
    }, [id]);

    const formatRuntime = (minutes) => {
        if (!minutes) return "N/A";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const formatCurrency = (amount) => {
        return amount > 0
            ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
            : "Unknown";
    };

    if (loading) return <div className="loading-screen"><div className="spinner"></div><p>Loading Details...</p></div>;
    if (error || !movie) return <div className="error-screen"><h2>Error</h2><p>{error}</p><Link to="/">Back Home</Link></div>;

    const director = movie.credits?.crew?.find(person => person.job === "Director");
    const watchProviders = movie?.["watch/providers"]?.results?.GH?.flatrate || [];

    return (
        <div className="movie-detail-page">
            {/* --- HERO SECTION --- */}
            <div className="detail-hero" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <div className="hero-overlay">
                    <div className="hero-content">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="detail-poster" />

                        <div className="detail-text">
                            <h1 className="detail-title">{movie.title} <span className="detail-year">({movie.release_date?.split("-")[0]})</span></h1>
                            {movie.tagline && <p className="detail-tagline">"{movie.tagline}"</p>}

                            <div className="detail-meta">
                                <span className="detail-rating">
                                    <span className="material-symbols-outlined">star</span>
                                    {Number(movie.vote_average).toFixed(1)}
                                </span>
                                <span className="separator">•</span>
                                <span>{formatRuntime(movie.runtime)}</span>
                                <span className="separator">•</span>
                                <span>{movie.genres?.map(g => g.name).join(", ")}</span>
                            </div>

                            {/* --- TRAILER BUTTON --- */}
                            <button className="detail-trailer-btn" onClick={() => setShowTrailer(true)}>
                                <span className="material-symbols-outlined">play_circle</span>
                                Watch Trailer
                            </button>

                            <div className="detail-overview">
                                <h3>Overview</h3>
                                <p>{movie.overview}</p>
                            </div>

                            {/* --- WATCH ON SECTION --- */}
                            {watchProviders.length > 0 && (
                                <div className="watch-on-section">
                                    <h4>Watch On</h4>
                                    <div className="provider-list">
                                        {watchProviders.map(provider => (
                                            <div key={provider.provider_id} className="provider-item" title={provider.provider_name}>
                                                <img
                                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                                    alt={provider.provider_name}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CAST SECTION --- */}
            <div className="cast-container">
                <h2>Top Cast</h2>
                <div className="cast-grid">
                    {movie.credits?.cast?.slice(0, 10).map((actor) => (
                        <div key={actor.id} className="cast-card">
                            <img
                                src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/185x278/1a1a1a/ffffff?text=No+Photo"}
                                alt={actor.name} className="cast-photo"
                            />
                            <div className="cast-info">
                                <p className="actor-name">{actor.name}</p>
                                <p className="character-name">{actor.character}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- EXTRA INFO & RECOMMENDATIONS --- */}
            <div className="extra-info-container">
                <div className="info-grid">
                    <div className="info-block">
                        <h3>Director</h3>
                        <p>{director ? director.name : "N/A"}</p>
                    </div>
                    <div className="info-block">
                        <h3>Status</h3>
                        <p>{movie.status}</p>
                    </div>
                    <div className="info-block">
                        <h3>Budget</h3>
                        <p>{formatCurrency(movie.budget)}</p>
                    </div>
                    <div className="info-block">
                        <h3>Revenue</h3>
                        <p>{formatCurrency(movie.revenue)}</p>
                    </div>
                </div>

                <div className="production-section">
                    <h3>Production Companies</h3>
                    <div className="production-logos">
                        {movie.production_companies?.map(company => (
                            company.logo_path ? (
                                <img
                                    key={company.id}
                                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                    alt={company.name}
                                    title={company.name}
                                />
                            ) : <span key={company.id} className="company-name-text">{company.name}</span>
                        ))}
                    </div>
                </div>

                {movie.recommendations?.results?.length > 0 && (
                    <div className="recommendations-container">
                        <hr className="section-divider" />
                        <h2>You Might Also Like</h2>
                        <div className="scroll-wrapper">
                            <button className="scroll-arrow scroll-left" onClick={() => scroll('left')}>
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <div className="recommendations-scroll" ref={scrollContainerRef}>
                                {movie.recommendations.results.slice(0, 10).map((rec) => (
                                    <Link to={`/movie/${rec.id}`} key={rec.id} className="rec-card">
                                        <div className="rec-poster-wrapper">
                                            <img
                                                src={rec.poster_path
                                                    ? `https://image.tmdb.org/t/p/w342${rec.poster_path}`
                                                    : "https://via.placeholder.com/342x513?text=No+Image"}
                                                alt={rec.title}
                                            />
                                            <div className="rec-rating">
                                                <span className="material-symbols-outlined">star</span>
                                                {rec.vote_average.toFixed(1)}
                                            </div>
                                        </div>
                                        <p className="rec-title">{rec.title}</p>
                                    </Link>
                                ))}
                            </div>
                            <button className="scroll-arrow scroll-right" onClick={() => scroll('right')}>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* --- TRAILER MODAL --- */}
            {showTrailer && (
                <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
                    <div className="trailer-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-trailer" onClick={() => setShowTrailer(false)}>✕</button>
                        <MovieTrailer movieId={movie.id} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetail;
