import React from 'react';
import PropTypes from 'prop-types';
//import cn from 'classnames';  // Line 3:8:  'cn' is defined but never used  no-unused-vars

function GenerateButton(props) {
  return (
    <div
      className={`generate-button flex flex-col bg-white rounded-[22px] overflow-hidden ${props.className ||
        ''}`}>
      <img
        className="w-6.75 m-2"
        src={'/assets/GenerateButton/135982799adfa93f00565d4fdb152f0f.jpg'}
        alt="alt text"
      />
    </div>
  );
}

GenerateButton.propTypes = {
  className: PropTypes.string
};

export default GenerateButton;
