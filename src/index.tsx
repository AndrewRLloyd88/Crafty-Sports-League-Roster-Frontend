import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './stylesheets/reset.css';
import './stylesheets/typescale.css';
import './stylesheets/index.css';
import axios from 'axios';

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
