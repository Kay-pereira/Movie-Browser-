import { StrictMode, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import App from './App.jsx';

function RootWrapper() {
  const setScriptRoute = useRef(false);

  /*useEffect(() => {
    if (!setScriptRoute.current) {
      // Only inject once
      const script = injectSpeedInsights({
        framework: "react",
      });
      setScriptRoute.current = true;
    }
  }, []); */

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootWrapper />
  </StrictMode>
);
