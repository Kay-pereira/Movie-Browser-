import React, { useState, useEffect } from "react";

function MovieTrailer({ movieId }) {
  const [trailerId, setTrailerId] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchTrailer = async () => {
      setLoading(true); // Reset loading when movieId changes
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=cf9ed83f24d3f89dce4e9a7f4b637ea3`
        );
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          setTrailerId(null);
        } else {
          const video =
            data.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
            data.results.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
            data.results.find((v) => v.type === "Featurette" && v.site === "YouTube") ||
            data.results.find((v) => v.site === "YouTube");

          setTrailerId(video?.key || null);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
        setTrailerId(null);
      } finally {
        setLoading(false); // Stop loading regardless of outcome
      }
    };

    if (movieId) fetchTrailer();
  }, [movieId]);

  // 1. Show Skeleton while fetching
  if (loading) {
    return <div className="trailer-skeleton"></div>;
  }

  // 2. Show Error only if fetch finished and found nothing
  if (!trailerId) {
    return <div className="no-trailer">No trailer available</div>;
  }

  // 3. Show Trailer
  return (
    <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: "8px", overflow: "hidden" }}>
      <iframe
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=0`} 
        title="Movie Trailer"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}

export default MovieTrailer;