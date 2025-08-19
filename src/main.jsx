import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './css/index.css'
import App from './App.jsx'
import { useRef, useEffect } from 'react';

//Vercel tools
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const setScriptRoute = useRef(false);

useEffect(() => {
  if (!setScriptRoute.current) {
    const script = injectSpeedInsights({
      framework: props.framework ?? "react",
    });
    setScriptRoute.current = true;
  }
}, []);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
