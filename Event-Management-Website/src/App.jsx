import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProviderWrapper } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;