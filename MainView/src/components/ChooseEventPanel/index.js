/**
 * ChooseEventPanel component displays the event selection interface
 * @param {Object} props - Component props
 * @param {Array} props.events - Array of event objects
 * @param {boolean} props.isLoading - Loading state for events
 * @param {string} props.error - Error message if any
 * @param {Function} props.onEventClick - Callback function when event is clicked
 * @returns {JSX.Element} ChooseEventPanel component
 */
import React from 'react';
import PropTypes from 'prop-types';
import EventItem from '../EventItem';
import LoadingIndicator from '../common/LoadingIndicator';
import ErrorMessage from '../common/ErrorMessage';

const ChooseEventPanel = ({ events, isLoading, error, onEventClick }) => {
  return (
    <div className="choose-event bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pl-3 pt-3.5 pr-3 pb-3.5 flex flex-col w-11/12 mx-auto mt-2.5 pointer-events-auto z-20 max-h-96 h-96 aos-init aos-animate" data-aos="fade-up" data-aos-once="true">
      {/* Header section - fixed */}
      <div className="flex-shrink-0 pl-1.25 pt-0 pr-1.25 pb-0 flex gap-x-2 mb-4">
        <img
          className="w-5.25 h-5.25 min-w-5.25 max-w-5.25 min-h-5.25 max-h-5.25"
          src={'/assets/ChooseEvent/b604aafd1a5ffc9007e689a63a872c73.png'}
          alt="choose event icon"
        />
        <p className="font-bold text-4 leading-1.19 font-Inter text-black -tracking-0.4 w-36.5 my-px">
          Choose an event...
        </p>
      </div>

      {/* Scrollable content section */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-y-4.75 pr-2">
          {/* Loading state for events */}
          {isLoading && (
            <div className="flex justify-center items-center py-4">
              <LoadingIndicator />
            </div>
          )}

          {/* Error state for events */}
          {error && (
            <ErrorMessage message={error} className="mb-2" />
          )}

          {/* Event items mapped from API data */}
          {!isLoading && events.length === 0 && !error && (
            <div className="text-center py-4 text-gray-500">
              No events found for this location.
            </div>
          )}

          {!isLoading && Array.isArray(events) && events.map((event) => (
            <EventItem 
              key={event.id} 
              event={event} 
              onEventClick={onEventClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ChooseEventPanel.propTypes = {
  events: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onEventClick: PropTypes.func.isRequired
};

export default ChooseEventPanel;

