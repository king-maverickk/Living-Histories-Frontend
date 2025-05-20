import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from './GoogleMap';
import SwipeableCardContainer from 'components/SwipeableCardContainer';

function MainView(props) {
  const [placesData, setPlacesData] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('placesData');
        if (cachedData) {
          setPlacesData(JSON.parse(cachedData));
        } else {
          // Fetch places data from the API
          // need the id (immediate area; get this from geocoding) and partitionKey (province)
          const response = await fetch(process.env.REACT_APP_PLACES_ENDPOINT+"?id=1111&partitionKey=1111");
          if (!response.ok) throw new Error("Failed to fetch data");

          const data = await response.json();
          localStorage.setItem('placesData', JSON.stringify(data));
          setPlacesData(data);
        }
      } catch (error) {
        console.error("Error loading places data:", error);
      }
    };

    fetchData();
  }, []);

  if (!placesData) {
    return <div className="text-center mt-10">Loading location data...</div>;
  }

  return (
    <div className={`main-view flex flex-col h-full relative ${props.className || ''}`}>
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <GoogleMap places={placesData} onAddressResolved={setUserAddress} />
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
                <p className="font-medium text-4.5 leading-1.2 font-Inter text-gray mr-8">
                  You are at...
                </p>
                <p className="text-4 leading-1.22 font-Inter text-black truncate">
                  {userAddress || "Finding your location..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swipeable cards at bottom */}
      <div className="w-142 h-55 flex gap-x-3 absolute left-3.75 bottom-5.25 min-h-31 z-20 pointer-events-none">
        <SwipeableCardContainer places={placesData} />
      </div>
    </div>
  );
}

MainView.propTypes = {
  className: PropTypes.string
};

export default MainView;
