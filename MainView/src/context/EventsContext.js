/**
 * Events Context Provider
 * Manages events-related state across the application
 */
import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useEvents } from '../hooks/useEvents';
import { useLocationContext } from './LocationContext';

const EventsContext = createContext();

/**
 * EventsProvider component that provides events state to child components
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} EventsProvider component
 */
export const EventsProvider = ({ children }) => {
  const { town, country } = useLocationContext();
  const eventsState = useEvents(town, country);

  return (
    <EventsContext.Provider value={eventsState}>
      {children}
    </EventsContext.Provider>
  );
};

EventsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Custom hook to use events context
 * @returns {Object} Events state and handlers
 * @throws {Error} If used outside of EventsProvider
 */
export const useEventsContext = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEventsContext must be used within an EventsProvider');
  }
  return context;
};

export default EventsProvider;

