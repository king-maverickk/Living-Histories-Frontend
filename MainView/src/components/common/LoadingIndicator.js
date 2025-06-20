/**
 * LoadingIndicator component displays a loading spinner with optional text
 * @param {Object} props - Component props
 * @param {string} props.text - Text to display alongside the spinner
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} LoadingIndicator component
 */
import React from 'react';
import PropTypes from 'prop-types';

const LoadingIndicator = ({ text = 'Loading...', className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
      <span className="text-sm">{text}</span>
    </div>
  );
};

LoadingIndicator.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export default LoadingIndicator;

