import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import 'rsuite/dist/styles/rsuite-default.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/react';
import ReportError from './components/ReportError';

// Returns true in development.
const dev: boolean =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === '';

// THE DEVIL YOU KNOW - SINGULARITY COMETH.
ReactGA.initialize('UA-192090799-1', {
  debug: dev,
  gaOptions: {
    cookieDomain: 'auto',
  },
});

// THE DEVIL YOU DON'T - ERROR REPORTING.
Sentry.init({
  debug: dev,
  environment: dev ? 'development' : 'production',
  release: 'democracy@0.1.0',
  dsn:
    'https://09d854276f174feaa67947c83611ced8@o464543.ingest.sentry.io/5674705',
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Sentry.ErrorBoundary fallback={<ReportError />}>
        <App />
      </Sentry.ErrorBoundary>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
