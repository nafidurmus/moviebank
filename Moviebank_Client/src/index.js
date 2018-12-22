import React from 'react';
import ReactDOM from 'react-dom';
import './view/css/index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactRouter from './routes';
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
<Router>
    <ReactRouter />
</Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
