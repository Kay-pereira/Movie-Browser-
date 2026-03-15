import { Link, NavLink } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="material-symbols-outlined brand-icon">local_fire_department</span>
                    <span className="brand-text">Trending Movies</span>
                </Link>

                <div className="navbar-links">
                    <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                        <span className="material-symbols-outlined">home</span>
                        <span>Home</span>
                    </NavLink>

                    <NavLink to="/favorites" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                        <span className="material-symbols-outlined">favorite</span>
                        <span>Favorites</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;