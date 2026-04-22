import './index.css';
import './App.css';
import './components/Navbar.css';
import './pages/Home.css';
import './pages/Templates.css';
import './pages/Builder.css';
import './pages/Auth.css';
import './pages/About.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
