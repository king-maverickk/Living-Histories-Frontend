/**
 * Utility functions for event data processing
 */

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

/**
 * Parse free-text event string into structured object
 * @param {string} eventString - Raw event string to parse
 * @returns {Object|null} Parsed event object or null if invalid
 */
export const parseEventString = (eventString) => {
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

/**
 * Get category image path based on event category
 * @param {string} category - Event category
 * @returns {string} Image path for the category
 */
export const getCategoryImage = (category) => {
  return categoryImages[category] || categoryImages.default;
};

/**
 * Generate unique event ID
 * @returns {string} Unique event identifier
 */
export const generateEventId = () => {
  return `event-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate event object structure
 * @param {Object} event - Event object to validate
 * @returns {boolean} True if event is valid
 */
export const isValidEvent = (event) => {
  return event && 
         typeof event === 'object' && 
         typeof event.eventName === 'string' && 
         event.eventName.trim().length > 0;
};

