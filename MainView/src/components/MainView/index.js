/**
 * MainView Component - Refactored with modular architecture
 * Main application view that displays the map, location info, and event selection
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} MainView component
 */
import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from './GoogleMap';
import SwipeableCardContainer from '../SwipeableCardContainer';
import GenerateButton from '../GenerateButton';
import LocationBar from '../LocationBar';
import ChooseEventPanel from '../ChooseEventPanel';
import LoadingIndicator from '../common/LoadingIndicator';

// Context hooks
import { useLocationContext } from '../../context/LocationContext';
import { useEventsContext } from '../../context/EventsContext';
import { useAudioContext } from '../../context/AudioContext';
import { useAppContext } from '../../context/AppContext';

// Custom hooks
import { usePlaces } from '../../hooks/usePlaces';

/**
 * MainView component with refactored modular architecture
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered MainView component
 */
function MainView(props) {
  // Context state
  const { userAddress, street, town, country, setUserAddress, handleAreaResolved } = useLocationContext();
  const { events, isLoadingEvents, eventsError } = useEventsContext();
  const { audioCards, fetchAudioUrl } = useAudioContext();
  const { showChooseEvent, setShowChooseEvent } = useAppContext();

  // Local state for places data
  const { placesData, isLoadingPlaces } = usePlaces(street, town, country);

  /**
   * Handle generate button click - now toggles the event selection panel
   * @param {Event} e - Click event
   */
  const handleGenerateButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowChooseEvent(!showChooseEvent);
  };

  /**
   * Handle event selection
   * Generates audio for the selected event and closes the panel
   * @param {Object} event - Selected event object
   */
  const handleEventClick = (event) => {
    fetchAudioUrl(event);
    setShowChooseEvent(false);
  };

  return (
    <div className={`main-view flex flex-col h-screen w-full relative ${props.className || ''}`}>
      {/* Map Background - Ensure it fills the entire viewport */}
      <div className="absolute inset-0 w-full h-full z-0">
        <GoogleMap
          places={placesData}
          onAddressResolved={setUserAddress}
          onAreaResolved={handleAreaResolved}
        />
      </div>

      {/* Places data loading indicator */}
      {isLoadingPlaces && (
        <div className="absolute top-20 right-4 bg-white p-2 rounded-lg shadow-md z-30">
          <LoadingIndicator text="Loading places..." />
        </div>
      )}

      {/* Dark overlay - shown when ChooseEvent is visible */}
      {showChooseEvent && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 z-5 pointer-events-auto"
          onClick={() => setShowChooseEvent(false)}
        ></div>
      )}

      {/* Main content overlaid on the map background */}
      <div className="flex flex-col h-full w-full overflow-hidden relative z-10 pointer-events-none">
        <div className="flex flex-col w-full">
          {/* Top bar section with location details and GenerateButton */}
          <div className="flex flex-row items-center mx-3.75 mt-8 pointer-events-auto">
            {/* Location details component */}
            <LocationBar userAddress={userAddress} />
            
            {/* GenerateButton with 12px gap - now toggles ChooseEventPanel */}
            <div onClick={handleGenerateButtonClick}>
              <GenerateButton className="ml-3" />
            </div>
          </div>

          {/* ChooseEvent component - shown when GenerateButton is clicked */}
          {showChooseEvent && (
            <ChooseEventPanel
              events={events}
              isLoading={isLoadingEvents}
              error={eventsError}
              onEventClick={handleEventClick}
            />
          )}
        </div>
      </div>

      {/* SwipeableCardContainer - now absolutely positioned */}
      <SwipeableCardContainer 
        places={placesData} 
        audioCards={audioCards}
      />
    </div>
  );
}

MainView.propTypes = {
  className: PropTypes.string
};

export default MainView;

