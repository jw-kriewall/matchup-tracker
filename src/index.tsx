import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './data/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';

// @TODO: clientID should be env variable
const clientId = "946171427391-9q1lkna1ibpgq49g2fivl8m2edg6304a.apps.googleusercontent.com";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <Provider store={store}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
