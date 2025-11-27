// File: src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import muiTheme from "./theme/mui-theme";
import "./index.css"; // tailwind + base styles

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MUIThemeProvider theme={muiTheme}>
      <App />
    </MUIThemeProvider>
  </React.StrictMode>
);

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'

// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// )
