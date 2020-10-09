import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import * as serviceWorker from './serviceWorker';

import './assets/styles/css-reset.css';
import './assets/styles/App.css'
import { CurrentTabGuard } from "./components/CurrentTabGuard";

ReactDOM.render(
    <React.StrictMode>
        <CurrentTabGuard>
            <App/>
        </CurrentTabGuard>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
