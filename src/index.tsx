import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import 'rsuite/dist/styles/rsuite-default.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga';

(function () {
  const id = 'UA-192090799-1';
  console.log('Starting Google Analytics, id: ' + id);
  ReactGA.initialize(id);
  ReactGA.pageview('/');
})();

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
