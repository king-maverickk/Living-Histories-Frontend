/**
 * InformationCard Component
 * Interactive card component that displays event information and audio playback
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the card
 * @param {string} props.eventName - Name of the event
 * @param {string} props.eventYears - Years when the event occurred
 * @param {string} props.eventCategory - Category of the event
 * @param {string} props.audioUrl - URL of the audio file
 * @param {boolean} props.isLoading - Loading state indicator
 * @param {string} props.audioError - Error message if audio fails to load
 * @returns {JSX.Element} InformationCard component
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * InformationCard component for displaying event information with audio playback
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered InformationCard component
 */
function InformationCard({ eventName, eventYears, eventCategory, audioUrl, isLoading, audioError, id, eventScript }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audio, setAudio] = useState(null);
  const progressBarRef = useRef(null);
  const cardRef = useRef(null);

  /**
   * Initialize audio object when audioUrl is available
   */
  useEffect(() => {
    if (audioUrl) {
      const newAudio = new Audio(audioUrl);
      
      newAudio.addEventListener('loadedmetadata', () => {
        setAudioDuration(newAudio.duration);
      });
      
      newAudio.addEventListener('timeupdate', () => {
        setCurrentTime(newAudio.currentTime);
      });
      
      newAudio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      
      setAudio(newAudio);
      
      // Auto-expand card when audio is ready
      setIsExpanded(true);
      
      return () => {
        newAudio.pause();
        newAudio.removeEventListener('loadedmetadata', () => {});
        newAudio.removeEventListener('timeupdate', () => {});
        newAudio.removeEventListener('ended', () => {});
      };
    }
  }, [audioUrl]);

  /**
   * Handle play/pause button click
   * @param {Event} e - Click event
   */
  const handlePlayPause = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  /**
   * Handle "Open more" click to expand card fully
   */
  const handleOpenMore = () => {
    setIsFullyExpanded(true);
    
    // Add a class to the body to darken the map background
    document.body.classList.add('map-darkened');
  };

  /**
   * Handle close button click to collapse card
   * @param {Event} e - Click event
   */
  const handleClose = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsFullyExpanded(false);
    
    // Remove the class from the body when closing
    document.body.classList.remove('map-darkened');
  };

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      document.body.classList.remove('map-darkened');
    };
  }, []);

  /**
   * Format time in MM:SS format
   * @param {number} timeInSeconds - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0;

  return (
    <div 
      ref={cardRef}
      className={`information-card relative overflow-hidden transition-all behavior duration-500 ease-in-out ${
        isFullyExpanded 
          ? 'h-[500px] rounded-[20px] shadow-xl z-50' 
          : isExpanded 
            ? 'h-auto rounded-[20px] shadow-md' 
            : 'h-16 rounded-[20px] shadow-md'
      }`}
      style={{
        backgroundColor: isFullyExpanded ? 'white' : 'white', // Changed to white for expanded state
        transform: isFullyExpanded ? 'scale(1.05)' : 'scale(1)', // Enhanced growing animation
        transformOrigin: 'top',
      }}
    >
      {/* Fully expanded view with white background */}
      {isFullyExpanded && (
        <div className="inset-0 w-full h-full bg-white">
          {/* Background image - covering title and play button */}
          <div className="top-0 left-0 right-0 h-2/5 overflow-hidden">
            <img 
              src="/assets/InformationCard/background_city_view.jpg" 
              alt="Background" 
              className="w-full h-190 object-cover"
            />
            {/* broken actually */}
          </div>
          
          {/* Close button - enhanced with circular semi-transparent background */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center z-10 hover:bg-black/60 transition-all duration-200 border border-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Play button (larger and positioned higher) */}
          <div className="absolute top-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={handlePlayPause}
              className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg focus:outline-none border-2 border-white/50"
              disabled={!audioUrl || audioError}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Content container */}
          <div className="inset-0 flex flex-col p-3">
            {/* Event title and year - positioned at the bottom of the image section */}
            <div className="mb-4 text-white">
              <h2 className="text-2l font-semibold text-black">{eventName}</h2>
              <p className="text-sm text-gray-300">{eventYears}</p>
            </div>
            
            {/* Info tags - aligned as one row with horizontal scroll and 0 margin top */}
            <div className="flex gap-1 overflow-x-auto scrollbar-hide mt-0 mb-4 text-white" style={{ marginTop: '0px' }}>
              {/* Category tag */}
              <div className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0" style={{ backgroundColor: '#303030' }}>
                {eventCategory || 'Historical'}
              </div>

              {/* Not fact checked tag */}
              <div className="px-3 py-1 rounded-full text-xs font-semibold flex items-center whitespace-nowrap flex-shrink-0" style={{ backgroundColor: '#FFD60A', color: '#7A5F00' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Not fact checked
              </div>

              {/* Audio guide tag */}
              <div className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0" style={{ backgroundColor: '#1f1f1f' }}>
                Audio guide
              </div>

              {/* Cultural Heritage tag */}
              <div className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0" style={{ backgroundColor: '#1b1c1e' }}>
                Cultural Heritage
              </div>
            </div>
            
            {/* Description text - now with dark text */}
            <p className="text-sm text-gray-700 mb-4 line-clamp-5">
              {eventScript}
            </p>
            
            {/* Audio progress - made more visible */}
            <div className="w-full mt-auto">
              <div className="flex items-center justify-between text-xs mb-1 text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(audioDuration)}</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-black rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Regular card view (not fully expanded) */}
      {!isFullyExpanded && (
        <>
          <div className="flex items-center p-3">
            {/* Left side - Play button or loading state */}
            <div className="mr-3">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <button 
                  onClick={handlePlayPause}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md focus:outline-none"
                  disabled={!audioUrl || audioError}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              )}
            </div>
            
            {/* Middle - Event name and progress bar */}
            <div className="flex-grow">
              <div className="text-base font-semibold text-gray-900 line-clamp-2 w-full">
                {eventName || "Loading event information..."}
              </div>
              
              <div className="mt-1 relative h-2 bg-gray-200 rounded-full overflow-hidden z-10" ref={progressBarRef}>
                {/* Progress bar with shimmer effect during loading */}
                {isLoading ? (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 animate-shimmer" 
                       style={{ 
                         backgroundSize: '200% 100%',
                         animation: 'shimmer 1.5s infinite linear'
                       }}></div>
                ) : (
                  <div 
                    className="h-full bg-black rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                )}
              </div>
            </div>
            
            {/* Right - Timer */}
            <div className="ml-3 text-xs text-gray-500 min-w-[35px] text-right">
              {isLoading ? '0:00' : formatTime(currentTime)}
            </div>
          </div>
          
          {/* Expanded section with "Open more" text */}
          {isExpanded && (
            <div className="px-4 pb-3 pt-0">
              <div 
                className="text-center text-sm text-white cursor-pointer hover:text-gray-200 bg-[#303030] py-1 rounded-md"
                onClick={handleOpenMore}
              >
                Open more
              </div>
            </div>
          )}
          
          {/* Error message if audio failed to load */}
          {audioError && (
            <div className="px-4 pb-3 text-xs text-red-500">
              Oop! Failed to load audio. Please try again.
            </div>
          )}
        </>
      )}
      
      {/* CSS for shimmer animation, map darkening, and scrollbar hiding */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
        
        /* Hide scrollbar for tags */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Global style for map darkening */
        :global(body.map-darkened::before) {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 40;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

InformationCard.propTypes = {
  id: PropTypes.string,
  eventName: PropTypes.string,
  eventYears: PropTypes.string,
  eventCategory: PropTypes.string,
  audioUrl: PropTypes.string,
  isLoading: PropTypes.bool,
  audioError: PropTypes.string
};

export default InformationCard;

