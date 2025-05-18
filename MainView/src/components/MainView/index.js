import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from './GoogleMap'; // Import the GoogleMap component
import SwipeableCardContainer from 'components/SwipeableCardContainer'; // Import the SwipeableCardContainer component
import placesData from './places.json'; // Import the places data

function MainView(props) {
 

  
  return (
    <div className={`main-view flex flex-col h-full relative ${props.className || ''}`}>
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <GoogleMap places={placesData} />
      </div>

      {/* Main content overlaid on the map background */}
      <div className="flex flex-col h-full overflow-hidden relative z-10 pointer-events-none">
        <div className="flex flex-col overflow-hidden">
          {/* Section for current user location details */}
          <div className="flex flex-col bg-white rounded-[38px] shadow-[0px_4px_51px_0px_rgba(0,0,0,0.1)] overflow-hidden mt-8 mx-3.75 mb-142.5 pointer-events-auto">
            <div className="flex items-center gap-x-3.25 mt-4 mx-6 mb-3.5">
              <img
                className="w-7"
                src={'/assets/MainView/right_arrow.png'}
                alt="alt text"
              />

              <div className="w-52.25 flex flex-col">
                <p className="font-medium text-5 leading-1.2 font-Inter text-black mr-8">
                  Current User Loc
                </p>
                <p className="text-4.5 leading-1.22 font-Inter text-black">
                  Podcast readiness?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-142 h-55 flex gap-x-3 absolute left-3.75 bottom-5.25 min-h-31 z-20 pointer-events-none">
        {/* Section for information related to a specific place */}
        
       
          <SwipeableCardContainer places={placesData} />
        
      </div>
    </div>
  );
}

MainView.propTypes = {
  className: PropTypes.string
};

export default MainView;