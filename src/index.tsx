import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import * as serviceWorker from './serviceWorker';

import './assets/styles/css-reset.css';
import './assets/styles/App.css'
import { CurrentTabGuard, ErrorBoundary } from "./components";
import { SnackbarProvider } from "notistack";
import { AppContextProvider } from "./components/AppContextProvider";

import './chrome/content'
import { LocalStorageProvider } from "./components/LocalStorageProvider";

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <SnackbarProvider maxSnack={3}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                              }}
                              autoHideDuration={3000}>
                <AppContextProvider>
                    <LocalStorageProvider>
                        <CurrentTabGuard>
                            <App/>
                        </CurrentTabGuard>
                    </LocalStorageProvider>
                </AppContextProvider>
            </SnackbarProvider>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
