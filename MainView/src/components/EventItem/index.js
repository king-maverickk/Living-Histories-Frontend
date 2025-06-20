/**
 * EventItem component displays a single event in the event list
 * @param {Object} props - Component props
 * @param {Object} props.event - Event object containing event details
 * @param {Function} props.onEventClick - Callback function when event is clicked
 * @returns {JSX.Element} EventItem component
 */
import React from 'react';
import PropTypes from 'prop-types';

const EventItem = ({ event, onEventClick }) => {
  const handleClick = () => {
    onEventClick(event);
  };

  return (
    <div 
      onClick={handleClick} 
      className="bg-[rgb(245,246,248)] rounded-[34px] pl-2 pt-2 pr-2 pb-2 flex flex-col overflow-hidden mb-2 cursor-pointer hover:bg-[rgb(235,236,238)] transition-colors"
    >
      <div className="flex items-center gap-x-1.75">
        <div className="flex flex-col bg-white rounded-[20px] w-10 overflow-hidden">
          <img
            className="w-5.25 h-5.25 mt-2.25 mr-2.5 mb-2.5 ml-2.25"
            src={event.eventTypeImg}
            alt="event type"
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
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
    eventYears: PropTypes.string,
    eventCategory: PropTypes.string,
    eventTypeImg: PropTypes.string.isRequired
  }).isRequired,
  onEventClick: PropTypes.func.isRequired
};

export default EventItem;

