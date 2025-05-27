import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from './GoogleMap';
import SwipeableCardContainer from 'components/SwipeableCardContainer';
import GenerateButton from 'components/GenerateButton';
import mockEvents from './mockEvents.json';

function MainView(props) {
  const [placesData, setPlacesData] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [street, setStreet] = useState(null);
  const [town, setTown] = useState(null);
  const [showChooseEvent, setShowChooseEvent] = useState(false);
  const [events] = useState(mockEvents);

  useEffect(() => {
    const fetchData = async () => {
      if (!street || !town) return;

      try {
        const cacheKey = `places_${street}_${town}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          setPlacesData(JSON.parse(cachedData));
        } else {
          const url = `${process.env.REACT_APP_PLACES_ENDPOINT}?id=${encodeURIComponent(
            street
          )}&partitionKey=${encodeURIComponent(town)}`;
          console.log("Fetching places with:", {
            id: street,
            partitionKey: town,
          });
          const response = await fetch(url);
          if (!response.ok) throw new Error('Failed to fetch data');

          const data = await response.json();
          localStorage.setItem(cacheKey, JSON.stringify(data));
          setPlacesData(data);
        }
      } catch (error) {
        console.error('Error loading places data:', error);
      }
    };

    fetchData();
  }, [street, town]);

  const handleGenerateButtonClick = () => {
    setShowChooseEvent(true);
  };

  const handleEventClick = () => {
    setShowChooseEvent(false);
  };

  return (
    <div className={`main-view flex flex-col h-screen w-full relative ${props.className || ''}`}>
      {/* Map Background - Ensuring it fills the entire viewport */}
      <div className="absolute inset-0 w-full h-full z-0">
        <GoogleMap
          places={placesData}
          onAddressResolved={setUserAddress}
          onAreaResolved={(area) => {
            setStreet(area.street);
            setTown(area.town);
          }}
        />
      </div>

      {/* Dark overlay - shown when ChooseEvent is visible */}
      {showChooseEvent && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-5 pointer-events-none"></div>
      )}

      {/* Main content overlaid on the map background */}
      <div className="flex flex-col h-full w-full overflow-hidden relative z-10 pointer-events-none">
        <div className="flex flex-col w-full">
          {/* Top bar section with location details and GenerateButton */}
          <div className="flex flex-row items-center mx-3.75 mt-8 pointer-events-auto">
            {/* Location details component */}
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
            
            {/* GenerateButton with 12px gap */}
            <div onClick={handleGenerateButtonClick}>
              <GenerateButton className="ml-3" /> {/* ml-3 is equivalent to 12px gap in Tailwind */}
            </div>
          </div>

          {/* ChooseEvent component - shown when GenerateButton is clicked */}
          {showChooseEvent && (
            <div className="choose-event bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pl-3 pt-3.5 pr-3 pb-3.5 flex flex-col overflow-hidden w-11/12 mx-auto mt-2.5 pointer-events-auto z-20" data-aos="fade-up" data-aos-once="true">
              {/* Main section for displaying event information */}
              <div className="flex flex-col gap-y-4.75">
                <div className="pl-1.25 pt-0 pr-1.25 pb-0 flex gap-x-2">
                  <img
                    className="w-5.25 h-5.25 min-w-5.25 max-w-5.25 min-h-5.25 max-h-5.25"
                    src={'/assets/ChooseEvent/b604aafd1a5ffc9007e689a63a872c73.png'}
                    alt="alt text"
                  />
                  <p className="font-bold text-4 leading-1.19 font-Inter text-black -tracking-0.4 w-36.5 my-px">
                    Choose an event...
                  </p>
                </div>

                {/* Event items mapped from mock data */}
                {events.map((event) => (
                  <div 
                    key={event.id} 
                    onClick={handleEventClick} 
                    className="bg-[rgb(245,246,248)] rounded-[34px] pl-2 pt-2 pr-2 pb-2 flex flex-col overflow-hidden mb-2"
                  >
                    <div className="flex items-center gap-x-1.75">
                      <div className="flex flex-col bg-white rounded-[20px] w-10 overflow-hidden">
                        <img
                          className="w-5.25 h-5.25 mt-2.25 mr-2.5 mb-2.5 ml-2.25"
                          src={event.eventTypeImg}
                          alt="alt text"
                        />
                      </div>

                      <div className="w-62.75 flex flex-col gap-y-0.75">
                        <p>
                          <span className="font-semibold text-3.5 leading-1.21 font-Inter text-black line-clamp-2">
                            {event.eventName}
                          </span>
                        </p>

                        <div className="flex gap-x-2.25">
                          <p className="font-medium text-3 leading-1.25 font-Inter text-[rgb(125,139,142)] w-11.25">
                            {event.eventCategory}
                          </p>
                          <p className="font-medium text-3 leading-1.25 font-Inter text-[rgb(125,139,142)] w-7.75">
                            {event.eventYears}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Swipeable cards at bottom */}
      {placesData && (
        <div className="w-full h-55 flex gap-x-3 absolute left-3.75 bottom-5.25 min-h-31 z-20 pointer-events-none">
          <SwipeableCardContainer places={placesData} />
        </div>
      )}
    </div>
  );
}

MainView.propTypes = {
  className: PropTypes.string
};

export default MainView;
