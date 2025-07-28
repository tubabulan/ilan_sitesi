import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter'ı import edin

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Uygulamanızı BrowserRouter ile sarın */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);