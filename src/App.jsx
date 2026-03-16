import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import MovieDetail from './components/MovieDetail';
import Favorites from './components/pages/Favorites';
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContexts';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Analytics />
        <SpeedInsights />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
