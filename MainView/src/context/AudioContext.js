/**
 * Audio Context Provider
 * Manages audio cards state across the application
 */
import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAudioCards } from '../hooks/useAudioCards';
import { useLocationContext } from './LocationContext';

const AudioContext = createContext();

/**
 * AudioProvider component that provides audio state to child components
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} AudioProvider component
 */
export const AudioProvider = ({ children }) => {
  const { town, country } = useLocationContext();
  const audioState = useAudioCards(town, country);

  return (
    <AudioContext.Provider value={audioState}>
      {children}
    </AudioContext.Provider>
  );
};

AudioProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Custom hook to use audio context
 * @returns {Object} Audio state and handlers
 * @throws {Error} If used outside of AudioProvider
 */
export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};

export default AudioProvider;

