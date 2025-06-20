/**
 * App Context Provider
 * Combines all context providers for the application
 */
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import LocationProvider from './LocationContext';
import EventsProvider from './EventsContext';
import AudioProvider from './AudioContext';

const AppContext = createContext();

/**
 * AppProvider component that provides global app state to child components
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} AppProvider component
 */
export const AppProvider = ({ children }) => {
  const [showChooseEvent, setShowChooseEvent] = useState(false);

  const appState = {
    showChooseEvent,
    setShowChooseEvent
  };

  return (
    <AppContext.Provider value={appState}>
      <LocationProvider>
        <EventsProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </EventsProvider>
      </LocationProvider>
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Custom hook to use app context
 * @returns {Object} App state and handlers
 * @throws {Error} If used outside of AppProvider
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppProvider;

