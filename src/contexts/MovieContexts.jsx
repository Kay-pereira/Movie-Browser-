

import { createContext,useState, useContext, useEffect,  } from "react";

const MovieContext = createContext() 

export const  useMovieContext = () => useContext(MovieContext)

export  const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    
    useEffect(() => {
        const StoredFaves = localStorage.getItem("favorites")

        if (StoredFaves) setFavorites(JSON.parse(StoredFaves))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const AddtoFavorites = (movie) => setFavorites (prev => [...prev, movie])
    

    const removeFromFavorites = (movieId ) => {
        setFavorites (prev => prev.filter(movie => movie.id !== movieId))

    }


    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        AddtoFavorites,
        removeFromFavorites,
        isFavorite }

        return( <MovieContext.Provider value={value}>
        {children}
      </MovieContext.Provider> )


}