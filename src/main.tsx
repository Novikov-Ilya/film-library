import React from 'react'
import { Container, createRoot } from 'react-dom/client'
import './index.scss'
import App from './components/App/App.jsx'
import { BrowserRouter } from 'react-router'
    
    createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    )

