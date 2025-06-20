/**
 * Custom hook for managing places data
 * @param {string} street - Street name
 * @param {string} town - Town name  
 * @param {string} country - Country name
 * @returns {Object} Places data state and loading status
 */
import { useState, useEffect } from 'react';

export const usePlaces = (street, town, country) => {
  const [placesData, setPlacesData] = useState(null);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!street || !town || !country) return;

      setIsLoadingPlaces(true);

      try {
        const cacheKey = `places_${town}_${country}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setPlacesData(parsedData);
          console.log("Using cached places data:", parsedData);
        } else {
          try {
            // API call would go here - currently disabled in original code
            const data = null;
            
            // Handle empty data case
            if (!data || (data.Content && data.Content.length === 0)) {
              console.log("No places data available");
              setPlacesData({ Content: [] });
            } else {
              localStorage.setItem(cacheKey, JSON.stringify(data));
              setPlacesData(data);
            }
          } catch (fetchError) {
            console.error("Fetch error:", fetchError);
            setPlacesData({ Content: [] });
            console.error("Couldn't load places data. Using default view.");
          }
        }
      } catch (error) {
        console.error('Error in places data flow:', error);
        setPlacesData({ Content: [] });
        console.error("Error loading places data. Using default view.");
      } finally {
        setIsLoadingPlaces(false);
      }
    };

    fetchData();
  }, [street, town, country]);

  return {
    placesData,
    isLoadingPlaces
  };
};

export default usePlaces;

