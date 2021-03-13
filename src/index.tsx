import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import 'rsuite/dist/styles/rsuite-default.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Fade } from 'react-awesome-reveal';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Fade triggerOnce delay={100} duration={800}>
        <div>
          <App />
        </div>
      </Fade>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
