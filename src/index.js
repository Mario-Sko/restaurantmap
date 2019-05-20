import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
//import data from './data.json';
import ContactDisplayapp from './contactdisplayapp.js';
import CreateGoogleReview from './createGoogleReview';


ReactDOM.render(<ContactDisplayapp />, document.getElementById('test'));
ReactDOM.render(<CreateGoogleReview/>, document.getElementById('overlaytest'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//ReactDOM.render(<App {...data} />, document.getElementById('map'));
serviceWorker.unregister();
