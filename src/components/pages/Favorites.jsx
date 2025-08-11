
import '../../css/Favorites.css';
import { useMovieContext } from '../../contexts/MovieContexts';
import MovieCard from '../MovieCard';
import { use } from 'react';

function Favorites () {
    const {favorites} = useMovieContext();

    if (favorites) {
        return (
        <div className='favorites'>
            <h2>Your Favorites</h2>
         <div className="movies-grid">
                {favorites.map((movie) =>  //movie.title.toLocaleLowerCase().startsWith(searchQuery) &&
                ( <MovieCard movie={movie} 
                   key = {movie.id} />
                ))} 
            </div>
        </div>
        )
    }

    
    return(
        <>
        <div className="favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p>Favorites Appear Here</p>
        </div>
        </>
    );
}

export default Favorites