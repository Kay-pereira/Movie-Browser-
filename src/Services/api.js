

const API_KEY = "cf9ed83f24d3f89dce4e9a7f4b637ea3";
const BASE_URL = "https://api.themoviedb.org/3";



// Updated Popular Movies to fetch specific pages
export const getPopularMovies = async (page = 1) => {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data = await response.json();
    return data.results || [];
};

// New Genre function that supports paging
export const getMoviesByGenre = async (genreId, page = 1) => {
    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
    );
    const data = await response.json();
    return data.results || [];
};

export const searchMovies = async(query) => {
    const response = await fetch (`${BASE_URL}/search/movie?api_key=${API_KEY}&query= 
        ${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results || [];
}
