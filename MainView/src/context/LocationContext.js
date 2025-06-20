/**
 * Location Context Provider
 * Manages location-related state across the application
 */
import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '../hooks/useLocation';

const LocationContext = createContext();

/**
 * LocationProvider component that provides location state to child components
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} LocationProvider component
 */
export const LocationProvider = ({ children }) => {
  const locationState = useLocation();

  return (
    <LocationContext.Provider value={locationState}>
      {children}
    </LocationContext.Provider>
  );
};

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Custom hook to use location context
 * @returns {Object} Location state and handlers
 * @throws {Error} If used outside of LocationProvider
 */
export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};

export default LocationProvider;

