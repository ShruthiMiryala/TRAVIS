import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Make sure this imports your Tailwind CSS file
import App from './App'; // Your main App component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
