import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#161616',
              color: '#dededf',
              border: '1px solid #333c4d',
              borderRadius: '10px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              fontSize: '14px',
            },
            success: {
              iconTheme: {
                primary: '#4cd964',
                secondary: '#161616',
              },
            },
            error: {
              iconTheme: {
                primary: '#e40b7f',
                secondary: '#161616',
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
