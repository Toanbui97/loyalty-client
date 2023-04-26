import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AlertProvider } from './context/AlertContext';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};


const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: '400',
            color: grey[700]
        },
    },
})

root.render(
    <AlertProvider>
        <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
            <App />
        </SnackbarProvider>
        </ThemeProvider>
    </AlertProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


