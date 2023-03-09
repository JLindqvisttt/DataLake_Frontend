import React from 'react';
import {createRoot} from 'react-dom/client';
import './Styles/index.css';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./Redux/store";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
serviceWorker.unregister();
