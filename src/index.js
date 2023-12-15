import React from 'react';
import './index.css';
import App from './App';
import { StrictMode } from "react";
import reportWebVitals from './reportWebVitals';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
   
      <BrowserRouter> 
      <AuthProvider>
        <App />
        </AuthProvider>
      </BrowserRouter>
    
  </StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
