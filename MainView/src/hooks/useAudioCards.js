/**
 * Custom hook for managing audio cards and generation
 * @param {string} town - Town name
 * @param {string} country - Country name
 * @returns {Object} Audio cards state and generation function
 */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useAudioCards = (town, country) => {
  const [audioCards, setAudioCards] = useState([]);

  /**
   * Fetch audio URL from API for a given event
   * @param {Object} event - Event object containing event details
   */
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
        town,
        country
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

  return {
    audioCards,
    fetchAudioUrl
  };
};

export default useAudioCards;

