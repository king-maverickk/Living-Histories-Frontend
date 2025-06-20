/**
 * LocationBar component displays the user's current location
 * @param {Object} props - Component props
 * @param {string} props.userAddress - The user's current address
 * @returns {JSX.Element} LocationBar component
 */
import React from 'react';
import PropTypes from 'prop-types';

const LocationBar = ({ userAddress }) => {
  return (
    <div className="flex flex-col bg-white rounded-[38px] shadow-[0px_4px_51px_0px_rgba(0,0,0,0.1)] overflow-hidden">
      <div className="flex items-center gap-x-3.25 mt-2 mx-6 mb-2">
        <img
          className="w-5.25"
          src={'/assets/MainView/right_arrow.png'}
          alt="arrow"
        />
        <div className="w-52.25 flex flex-col">
          <p className="font-medium text-4 leading-1.2 font-Inter text-gray mr-8">
            You are at...
          </p>
          <p className="text-3.5 leading-1.22 font-Inter text-black truncate">
            {userAddress || 'Finding your location...'}
          </p>
        </div>
      </div>
    </div>
  );
};

LocationBar.propTypes = {
  userAddress: PropTypes.string
};

export default LocationBar;

