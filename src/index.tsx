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
import { PageContextProvider, ProgressContext } from './components/contexts';
import { ProgressContextProvider } from './components/contexts/ProgressContext';

const ContextProviders: React.FC = ({ children }) => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            autoHideDuration={3000}
        >
            <UrlContextProvider>
                <PageContextProvider>
                    <LocalStorageProvider>
                        <ProgressContextProvider>{children}</ProgressContextProvider>
                    </LocalStorageProvider>
                </PageContextProvider>
            </UrlContextProvider>
        </SnackbarProvider>
    );
};

/*
Getting from local storage. Key: KEY
main.js:1 Get from local storage: 4.93 s
main.js:1 From storage 257
main.js:1 Downloaded 5
main.js:1 Create new array: 0.022 ms
main.js:1 Create new array and combine: 0.29 s
main.js:1 Saving to local storage...
===> Saving to local storage: 17.98 s  !!! 262 files
main.js:1 Get from local storage: 5.48 s
main.js:1 From storage 262
main.js:1 Downloaded 5
main.js:1 Create new array: 0.03173828125 ms
main.js:1 Create new array and combine: 371.579833984375 ms
main.js:1 Saving to local storage...
 */
ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <ContextProviders>
                <CurrentTabGuard>
                    <div className="container">
                        <Logo />
                        <App />
                    </div>
                </CurrentTabGuard>
            </ContextProviders>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
