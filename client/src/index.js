import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; //carousel

import client from './config/client'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <div style={{backgroundColor: "#08AEEA",
        backgroundImage: "linear-gradient(0deg, #08AEEA 36%, #2AF598 100%)"
      }}>
        <App />
      </div>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
  document.querySelector('.demo-carousel')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
