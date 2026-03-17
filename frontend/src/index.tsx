import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// BAD: Using ReactDOM.render (deprecated in React 18, but still React 16 style)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
