import React, { useState, useRef, useEffect } from 'react';
import InformationCard from 'components/InformationCard';

const SwipeableCardContainer = ({ places }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Minimum swipe distance required (in pixels)
  const minSwipeDistance = 50;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < places.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
    
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Scroll to current index when it changes
  useEffect(() => {
    if (containerRef.current) {
      const scrollPosition = currentIndex * (containerRef.current.offsetWidth / 3);
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className="w-full h-56 absolute left-4 bottom-5 z-20 pointer-events-none">
      <div 
        className="flex gap-x-3 overflow-x-hidden w-full pointer-events-auto"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {places.Content.map((place, index) => (
          <div key={index} className="flex-shrink-0">
            <InformationCard 
              placeName={place.name}
              distance={place.location?.radius ? `${place.location.radius}m away` : undefined}
              overview={place.overview}
              playButtonSrc={place.media?.podcastUrl}
            />
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center mt-3 pointer-events-auto">
        {places.Content.map((place, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* Optional arrow navigation */}
      <div className="absolute top-1/2 w-full flex justify-between px-2 -mt-4 pointer-events-auto">
        <button 
          onClick={handlePrevious}
          className={`bg-white rounded-full p-2 shadow ${currentIndex === 0 ? 'opacity-30' : 'opacity-100'}`}
          disabled={currentIndex === 0}
        >
          ←
        </button>
        <button 
          onClick={handleNext}
          className={`bg-white rounded-full p-2 shadow ${currentIndex === places.length - 1 ? 'opacity-30' : 'opacity-100'}`}
          disabled={currentIndex === places.length - 1}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default SwipeableCardContainer;