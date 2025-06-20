/**
 * GenerateButton Component
 * Button component that triggers event generation functionality
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} GenerateButton component
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * GenerateButton component for triggering event selection
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered GenerateButton component
 */
function GenerateButton(props) {
  return (
    <div
      className={`generate-button flex flex-col bg-white rounded-[22px] overflow-hidden ${props.className ||
        ''}`}>
      <img
        className="w-6.75 m-2"
        src={'/assets/GenerateButton/135982799adfa93f00565d4fdb152f0f.jpg'}
        alt="Generate button icon"
      />
    </div>
  );
}

GenerateButton.propTypes = {
  className: PropTypes.string
};

export default GenerateButton;

