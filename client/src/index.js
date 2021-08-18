import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importamos browserRouter para manejar rutas en nuestra app
import { BrowserRouter } from 'react-router-dom';
// Importamos el provider para envolver la app y usar states
import { Provider } from "react-redux";
// Importamos el store para pasarselo al provider y que toda la app sepa del estado global
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
