import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Firebase, {FirebaseContext} from "./Components/Firebase"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>
    </BrowserRouter>
);

