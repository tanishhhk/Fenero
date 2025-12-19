// src/main.jsx

/**
 * Copyright (c) 2025-2026 Fenero Capital Advisory LLP
 * All Rights Reserved.
 * 
 * This file is part of the Fenero platform and is proprietary software.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 * 
 * Author: Tanishk Jain
 * Company: Fenero Capital Advisory LLP
 * Contact: fenerocapitaladvisory@gmail.com
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);