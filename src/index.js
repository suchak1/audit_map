import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Log from './Log';
// import Map from './Map';
import App from './App';
import * as serviceWorker from './serviceWorker';
require('dotenv').config();
require("typeface-ubuntu-mono");
require("typeface-maven-pro");

ReactDOM.render(<><App /></>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
