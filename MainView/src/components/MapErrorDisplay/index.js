/**
 * MapErrorDisplay component displays error messages on the map
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {string} props.position - Position class for the error display
 * @returns {JSX.Element} MapErrorDisplay component
 */
import React from 'react';
import PropTypes from 'prop-types';

const MapErrorDisplay = ({ message, position = 'top-20 right-4' }) => {
  return (
    <div className={`absolute ${position} bg-white p-2 rounded-lg shadow-md z-30`}>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
        <span className="text-sm text-red-700">{message}</span>
      </div>
    </div>
  );
};

MapErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  position: PropTypes.string
};

export default MapErrorDisplay;

