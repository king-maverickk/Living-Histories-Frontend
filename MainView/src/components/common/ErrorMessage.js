/**
 * ErrorMessage component displays error messages with consistent styling
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} ErrorMessage component
 */
import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message, className = '' }) => {
  return (
    <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${className}`}>
      {message}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default ErrorMessage;

