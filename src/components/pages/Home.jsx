
import MovieCard from "../MovieCard";
import { searchMovies,getPopularMovies } from "../../Services/api";
import { useState, useEffect } from "react";
import '../../css/Home.css';

function Home () {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async() => {
            try {const popularMovies = await getPopularMovies()
            setMovies(popularMovies)} catch (err) {
                console.log(err);
                setError("Error: Failed to load movies...");
            } finally {
                setLoading(false)
            }
            } 
            loadPopularMovies()
    }, [])

    // Mock data
   // const movies = [
    //    {id:1, title:"John Wick", release_date: "2020"},
    //    {id:2, title:"Terminator", release_date: "2019"},
      //  {id:3, title:"One piece", release_date: "2024"},
   // ]

    const  handleSearch = async (e) => {
        e.preventDefault();
       
        if (!searchQuery.trim()) return 
        if (loading) return
        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)

        } catch (err) {
            console.log(err)
            setError("Failed to load movies...")
        } finally {
            setLoading (false)
        }

        e.preventDefault()
        setSearchQuery("")

    }
    return (
        <>

        <form action="" onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="Search for movies..." className="search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button type="Submit" className="Search-btn">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading? (<div className="loading">Loading...</div> ): (
        <div className="home">
            <div className="movies-grid">
                {movies.map((movie) =>  //movie.title.toLocaleLowerCase().startsWith(searchQuery) &&
                ( <MovieCard movie={movie} 
                   key = {movie.id} />
                ))} 
            </div>

        </div>
    )}
        </>
    );
}

export default Home