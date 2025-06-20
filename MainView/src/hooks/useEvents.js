/**
 * Custom hook for managing events data
 * @param {string} town - Town name
 * @param {string} country - Country name
 * @returns {Object} Events state and loading status
 */
import { useState, useEffect } from 'react';
import { parseEventString } from '../utils/eventUtils';

export const useEvents = (town, country) => {
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [eventsError, setEventsError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!town || !country) return;
      
      setIsLoadingEvents(true);
      setEventsError(null);
      
      try {
        const url = `${process.env.REACT_APP_GET_EVENTS_ENDPOINT}?location=${encodeURIComponent(town)}&country=${encodeURIComponent(country)}`;
        console.log("Fetching events with location:", town, country);
        
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
            .filter(Boolean);
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
                    eventTypeImg: item.eventTypeImg || getCategoryImage(item.eventCategory)
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
        setEvents([]);
      } finally {
        setIsLoadingEvents(false);
      }
    };
    
    fetchEvents();
  }, [town, country]);

  return {
    events,
    isLoadingEvents,
    eventsError
  };
};

/**
 * Get category image based on event category
 * @param {string} category - Event category
 * @returns {string} Image path
 */
const getCategoryImage = (category) => {
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
  
  return categoryImages[category] || categoryImages.default;
};

export default useEvents;

