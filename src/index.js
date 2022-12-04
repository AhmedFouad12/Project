import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import MediaContextProvider from '../src/component/Context/MediaContext';
import AuthContextProvider from '../src/component/Context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
    <MediaContextProvider>
       <App />
    </MediaContextProvider>
    </AuthContextProvider>
   
);

