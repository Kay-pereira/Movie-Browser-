import '../css/NavBar.css';
import { Link } from "react-router-dom"

function NavBar (){
    return (
        <>
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Trending Movies</Link>
            </div>

            <div className="navbar-links">
                <Link to="/" className="nav-links">Home</Link>
                <Link to="/favorites" className="nav-links">Favorites</Link>
            </div>
        </nav>
        </>
    )
}

export default NavBar