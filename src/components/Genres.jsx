import { useState, useEffect } from "react";

const API_KEY = "cf9ed83f24d3f89dce4e9a7f4b637ea3";

function Genres({ genreId }) {
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const fetchGenres = async () => {
      // Hardcoded genre data
      const data = {
        "genres": [
          { "id": 28, "name": "Action" },
          { "id": 12, "name": "Adventure" },
          { "id": 16, "name": "Animation" },
          { "id": 35, "name": "Comedy" },
          { "id": 80, "name": "Crime" },
          { "id": 99, "name": "Documentary" },
          { "id": 18, "name": "Drama" },
          { "id": 10751, "name": "Family" },
          { "id": 14, "name": "Fantasy" },
          { "id": 36, "name": "History" },
          { "id": 27, "name": "Horror" },
          { "id": 10402, "name": "Music" },
          { "id": 9648, "name": "Mystery" },
          { "id": 10749, "name": "Romance" },
          { "id": 878, "name": "Science Fiction" },
          { "id": 10770, "name": "TV Movie" },
          { "id": 53, "name": "Thriller" },
          { "id": 10752, "name": "War" },
          { "id": 37, "name": "Western" }
        ]
      };

      const map = {};
      data.genres.forEach((g) => {
        map[g.id] = g.name;
      });

      setGenres(map);
    };

    fetchGenres();
  }, []);

  if (!genreId || Object.keys(genres).length === 0) return null;

  return (
    <span>
      {genreId
        .map((id) => genres[id])
        .filter(Boolean)
        .join(", ")}
    </span>
  );
}



export default Genres;
