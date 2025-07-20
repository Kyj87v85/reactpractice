import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // 없으면 빈 파일이라도 만들어주세요

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
