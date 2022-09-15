import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
import { StateContext } from './context/StateContext';

ReactDOM.render(
  <StateContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StateContext>,
  document.getElementById('root'),
);
