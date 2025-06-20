/**
 * Main App Component
 * Root component that sets up routing and context providers
 * @returns {JSX.Element} App component
 */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainView from './components/MainView';
import { AppProvider } from './context';
import AOS from 'aos';
import { isMobile } from 'react-device-detect';

import 'aos/dist/aos.css';
import './fonts.css';
import './tailwind.css';

/**
 * App component with context providers and routing setup
 * @returns {JSX.Element} Rendered App component
 */
function App() {
  /**
   * Initialize AOS (Animate On Scroll) library
   * Sets up animations with mobile-specific offset
   */
  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        offset: isMobile ? 10 : 100,
      });
      AOS.refresh();
    }, 1500);
  }, []);

  return (
    <AppProvider>
      <Router basename={process.env.BASE_PATH}>
        <Switch>
          <Route exact path="/" component={MainView} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
