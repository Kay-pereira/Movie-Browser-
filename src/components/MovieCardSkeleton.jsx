import "../css/MovieCard.css"; // Reuse card layout
import "../css/Skeleton.css";

export default function MovieCardSkeleton() {
    return (
        <div className="movie-card skeleton-card">
            <div className="movie-poster skeleton-pulse"></div>
            <div className="movie-info">
                <div className="skeleton-line skeleton-pulse title-line"></div>
                <div className="skeleton-line skeleton-pulse meta-line"></div>
                <div className="skeleton-line skeleton-pulse text-line"></div>
                <div className="skeleton-line skeleton-pulse text-line last"></div>
            </div>
        </div>
    );
}