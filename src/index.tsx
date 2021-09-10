import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import reportWebVitals from './reportWebVitals';

import { App } from './App';
import { CurrentTabGuard, ErrorBoundary, Logo } from './components';
import { LocalStorageProvider, UrlContextProvider } from './components';

import './chrome/content';

import './assets/styles/css-reset.css';
import './assets/styles/App.css';
import { ProgressContext } from './components/contexts';
import { ProgressContextProvider } from './components/contexts/ProgressContext';

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                autoHideDuration={3000}
            >
                <UrlContextProvider>
                    <LocalStorageProvider>
                        <ProgressContextProvider>
                            <CurrentTabGuard>
                                <div className="container">
                                    <Logo />
                                    <App />
                                </div>
                            </CurrentTabGuard>
                        </ProgressContextProvider>
                    </LocalStorageProvider>
                </UrlContextProvider>
            </SnackbarProvider>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
