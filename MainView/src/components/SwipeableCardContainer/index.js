import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import InformationCard from 'components/InformationCard';

function SwipeableCardContainer({ places, audioCards }) {
  const containerRef = useRef(null);
  
  // Add horizontal scrolling behavior
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Scroll to the newest card (first in the list) when a new card is added
    if (audioCards && audioCards.length > 0) {
      container.scrollLeft = 0;
    }
  }, [audioCards]);

  return (
    <div 
      ref={containerRef}
      className="swipeable-card-container flex flex-row gap-x-3 overflow-x-auto pb-4 px-3 snap-x snap-mandatory pointer-events-auto"
      style={{
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: '-ms-autohiding-scrollbar'
      }}
    >
      {/* Audio Information Cards - shown when events are selected */}
      {audioCards && audioCards.map((card, index) => (
        <div 
          key={card.id} 
          className="min-w-[280px] max-w-[280px] flex-shrink-0 snap-start"
          style={{
            // Make the card slightly narrower to show a preview of the next card
            width: 'calc(90% - 12px)'
          }}
        >
          <InformationCard 
            id={card.id}
            eventName={card.eventName}
            audioUrl={card.audioUrl}
            isLoading={card.isLoading}
            audioError={card.audioError}
          />
        </div>
      ))}
      
      {/* Original place cards */}
      {places && places.Content && places.Content.map((place, index) => (
        <div
          key={`place-${index}`}
          className="min-w-[280px] max-w-[280px] flex-shrink-0 snap-start"
          style={{
            // Make the card slightly narrower to show a preview of the next card
            width: 'calc(90% - 12px)'
          }}
        >
          {/* Original place card content */}
          <div className="flex flex-col bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="flex items-center gap-x-3.25 mt-2 mx-6 mb-2">
              <img
                className="w-5.25"
                src={'/assets/MainView/right_arrow.png'}
                alt="arrow"
              />
              <div className="w-52.25 flex flex-col">
                <p className="font-medium text-4 leading-1.2 font-Inter text-gray mr-8">
                  Where are you going to?
                </p>
                <p className="text-3.5 leading-1.22 font-Inter text-black truncate">
                  {place.Name || 'Unknown location'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

SwipeableCardContainer.propTypes = {
  places: PropTypes.object,
  audioCards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      eventName: PropTypes.string,
      audioUrl: PropTypes.string,
      isLoading: PropTypes.bool,
      audioError: PropTypes.string
    })
  )
};

export default SwipeableCardContainer;
