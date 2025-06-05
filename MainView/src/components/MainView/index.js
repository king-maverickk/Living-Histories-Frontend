// MainView.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from './GoogleMap';
import SwipeableCardContainer from 'components/SwipeableCardContainer';
import GenerateButton from 'components/GenerateButton';
import { v4 as uuidv4 } from 'uuid';

  // Default event type images based on category
  const categoryImages = {
    'Cultural': '/assets/ChooseEvent/649408def69ab7b21e6f704f2a17816e.png',
    'Historical': '/assets/ChooseEvent/historical_marker.png',
    'Political': '/assets/ChooseEvent/political_event.png',
    'Civic': '/assets/ChooseEvent/political_event.png',
    'Civic/Political': '/assets/ChooseEvent/political_event.png',
    'Sports': '/assets/ChooseEvent/sports_event.png',
    'Music': '/assets/ChooseEvent/music_event.png',
    'default': '/assets/ChooseEvent/649408def69ab7b21e6f704f2a17816e.png'
  };

function MainView(props) {
  const [placesData, setPlacesData] = useState(null);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [street, setStreet] = useState(null);
  const [town, setTown] = useState(null);
  const [showChooseEvent, setShowChooseEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [eventsError, setEventsError] = useState(null);
  // Replace single audioUrl with array of audio cards
  const [audioCards, setAudioCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!street || !town) return;

      setIsLoadingPlaces(true);

      try {
        const cacheKey = `places_${street}_${town}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setPlacesData(parsedData);
          console.log("Using cached places data:", parsedData);
        } else {
          /*const url = `${process.env.REACT_APP_PLACES_ENDPOINT}?id=${encodeURIComponent(
            street
          )}&partitionKey=${encodeURIComponent(town)}`;
          console.log("Fetching places with:", {
            id: street,
            partitionKey: town,
          });*/
          
          try {
            /*const response = await fetch(url);
            console.log("Response status:", response.status);
            
            if (!response.ok) {
              throw new Error(`Failed to fetch data: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Fetched places data:", data);
            */
            const data = null;
            // Handle empty data case
            if (!data || (data.Content && data.Content.length === 0)) {
              console.log("No places data available");
              setPlacesData({ Content: [] }); // Set empty content array
            } else {
              localStorage.setItem(cacheKey, JSON.stringify(data));
              setPlacesData(data);
            }
          } catch (fetchError) {
            console.error("Fetch error:", fetchError);
            // Continue with empty data rather than failing
            setPlacesData({ Content: [] });
            console.error("Couldn't load places data. Using default view.");
          }
        }
      } catch (error) {
        console.error('Error in places data flow:', error);
        setPlacesData({ Content: [] }); // Provide fallback empty data
        console.error("Error loading places data. Using default view.");
      } finally {
        setIsLoadingPlaces(false);
      }
    };

    fetchData();
  }, [street, town]);

  // Parse free-text event string into structured object
  const parseEventString = (eventString) => {
    if (!eventString || typeof eventString !== 'string') {
      return null;
    }

    console.log("Parsing event string:", eventString);
    
    // Try to split by " - " pattern
    const parts = eventString.split(' - ');
    
    if (parts.length < 2) {
      // If can't split properly, return basic object with original string as name
      return {
        id: `event-${Math.random().toString(36).substr(2, 9)}`,
        eventName: eventString.trim(),
        eventYears: '',
        eventCategory: '',
        eventTypeImg: categoryImages.default
      };
    }
    
    // Extract parts based on expected format "EVENT - TIME_PERIOD - CATEGORY"
    let eventName, eventYears, eventCategory;
    
    if (parts.length >= 3) {
      // Full format with all three parts
      eventName = parts[0].trim();
      eventYears = parts[1].trim();
      eventCategory = parts[2].trim();
    } else if (parts.length === 2) {
      // Only two parts, assume EVENT - CATEGORY
      eventName = parts[0].trim();
      eventYears = '';
      eventCategory = parts[1].trim();
    }
    
    // Get appropriate image based on category
    const eventTypeImg = categoryImages[eventCategory] || categoryImages.default;
    
    return {
      id: `event-${Math.random().toString(36).substr(2, 9)}`,
      eventName,
      eventYears,
      eventCategory,
      eventTypeImg
    };
  };

  // Fetch events from API when town changes
  useEffect(() => {
    const fetchEvents = async () => {
      if (!town) return;
      
      setIsLoadingEvents(true);
      setEventsError(null);
      
      try {
        const url = `${process.env.REACT_APP_GET_EVENTS_ENDPOINT}?location=${encodeURIComponent(town)}`;
        console.log("Fetching events with location:", town);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch events');
        
        const data = await response.json();
        console.log("Fetched events data:", data);
        
        // Process the events data
        let processedEvents = [];
        
        if (Array.isArray(data)) {
          // If data is array of strings, parse each string
          processedEvents = data
            .filter(item => item && typeof item === 'string')
            .map(parseEventString)
            .filter(Boolean); // Remove any null results
        } else if (data && typeof data === 'object') {
          // If it's an object with items/events/data property
          let eventArray = null;
          
          if (Array.isArray(data.items)) {
            eventArray = data.items;
          } else if (Array.isArray(data.events)) {
            eventArray = data.events;
          } else if (Array.isArray(data.data)) {
            eventArray = data.data;
          }
          
          if (eventArray) {
            processedEvents = eventArray
              .filter(item => item && (typeof item === 'string' || typeof item === 'object'))
              .map(item => {
                if (typeof item === 'string') {
                  return parseEventString(item);
                } else if (item.eventName) {
                  // Already structured object
                  return {
                    ...item,
                    id: item.id || `event-${Math.random().toString(36).substr(2, 9)}`,
                    eventTypeImg: item.eventTypeImg || categoryImages[item.eventCategory] || categoryImages.default
                  };
                }
                return null;
              })
              .filter(Boolean);
          } else {
            console.error("Received events data in unexpected format:", data);
          }
        } else {
          console.error("Received events data in unexpected format:", data);
        }
        
        console.log("Processed events:", processedEvents);
        setEvents(processedEvents);
      } catch (error) {
        console.error('Error loading events data:', error);
        setEventsError('Failed to load events. Please try again later.');
        setEvents([]); // Ensure events is at least an empty array
      } finally {
        setIsLoadingEvents(false);
      }
    };
    
    fetchEvents();
  }, [town]);

  // Function to fetch audio URL from API
  const fetchAudioUrl = async (event) => {
    // Create a unique ID for this audio card
    const cardId = uuidv4();
    
    // Create a new audio card with loading state
    const newCard = {
      id: cardId,
      eventName: event.eventName,
      eventYears: event.eventYears,
      eventCategory: event.eventCategory,
      audioUrl: null,
      isLoading: true,
      audioError: null
    };
    
    // Add the new card to the beginning of the array
    setAudioCards(prevCards => [newCard, ...prevCards]);
    
    try {
      console.log("Fetching audio for event:", event);
      
      // Extract the required fields from the event object
      const { eventName, eventYears, eventCategory } = event;
      
      // Create the request body with separate fields including town
      const requestBody = {
        eventName,
        eventYears,
        eventCategory,
        town // Include the town in the request body
      };
      
      console.log("Sending audio request with:", requestBody);
      
      const url = process.env.REACT_APP_AUDIO_GEN_ENDPOINT;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error(`Audio API request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Audio API response:", data);
      
      // Update the card with the audio URL
      setAudioCards(prevCards => 
        prevCards.map(card => 
          card.id === cardId 
            ? { ...card, audioUrl: data.audioUrl, isLoading: false } 
            : card
        )
      );
    } catch (error) {
      console.error("Error fetching audio:", error);
      
      // Update the card with the error
      setAudioCards(prevCards => 
        prevCards.map(card => 
          card.id === cardId 
            ? { ...card, isLoading: false, audioError: `Failed to generate audio: ${error.message}` } 
            : card
        )
      );
    }
  };

  const handleGenerateButtonClick = () => {
    setShowChooseEvent(true);
  };

  const handleEventClick = (event) => {
    // Make the API request with the chosen event
    fetchAudioUrl(event);
    
    // Close the ChooseEvent component
    setShowChooseEvent(false);
  };

  return (
    <div className={`main-view flex flex-col h-screen w-full relative ${props.className || ''}`}>
      {/* Map Background - Ensure it fills the entire viewport */}
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

      {/* Places data loading indicator */}
      {isLoadingPlaces && (
        <div className="absolute top-20 right-4 bg-white p-2 rounded-lg shadow-md z-30">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
            <span className="text-sm">Loading places...</span>
          </div>
        </div>
      )}

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

                {/* Loading state for events */}
                {isLoadingEvents && (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                )}

                {/* Error state for events */}
                {eventsError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2">
                    {eventsError}
                  </div>
                )}

                {/* Event items mapped from API data */}
                {!isLoadingEvents && events.length === 0 && !eventsError && (
                  <div className="text-center py-4 text-gray-500">
                    No events found for this location.
                  </div>
                )}

                {!isLoadingEvents && Array.isArray(events) && events.map((event) => (
                  <div 
                    key={event.id} 
                    onClick={() => handleEventClick(event)} 
                    className="bg-[rgb(245,246,248)] rounded-[34px] pl-2 pt-2 pr-2 pb-2 flex flex-col overflow-hidden mb-2 cursor-pointer hover:bg-[rgb(235,236,238)] transition-colors"
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
                          <p className="font-medium text-3 leading-1.25 font-Inter text-[rgb(125,139,142)] whitespace-nowrap">
                            {event.eventCategory}
                          </p>
                          <p className="font-medium text-3 leading-1.25 font-Inter text-[rgb(125,139,142)] whitespace-nowrap">
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

        {/* Bottom section with SwipeableCardContainer */}
        <div className="mt-auto mb-4 w-full">
          <SwipeableCardContainer 
            places={placesData} 
            audioCards={audioCards}
          />
        </div>
      </div>
    </div>
  );
}

MainView.propTypes = {
  className: PropTypes.string
};

export default MainView;