import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'
import { ToastProvider } from '@heroui/react';
import { createTheme, ThemeProvider } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'

const theme = createTheme({
  breakpoints: {
    values: {
      sm: "576px",
      md: "768",
      lg: "1024",
      xl: "1200px",
      "2xl": "1536px",
    },
  },
});

const isMobile = window.innerWidth < 768;

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>

        <ThemeProvider theme={theme}>
          <ToastProvider className="z-[99999999]" placement={`${isMobile ? 'top' : 'bottom'}`} />
          <App />
        </ThemeProvider>

      </BrowserRouter>
    </Provider>
  </HelmetProvider>
)