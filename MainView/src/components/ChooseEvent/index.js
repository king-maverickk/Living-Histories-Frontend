import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

function ChooseEvent(props) {
  return (
    <div
      className={`choose-event bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pl-3 pt-3.5 pr-3 pb-3.5 flex flex-col overflow-hidden ${props.className ||
        ''}`}
      data-aos="fade-up"
      data-aos-once="true">
      {/* Main section for displaying event information */}

      <div className="flex flex-col gap-y-4.75">
        <div className="pl-1.25 pt-0 pr-1.25 pb-0 flex gap-x-2">
          <img
            className="w-5.25 h-5.25 min-w-5.25 max-w-5.25 min-h-5.25 max-h-5.25"
            src={'/assets/ChooseEvent/b604aafd1a5ffc9007e689a63a872c73.png'}
            alt="alt text"
          />
          <p className="font-bold text-4 leading-1.19 font-Inter text-black -tracking-0.4 w-36.5 my-px">
            Choose an event...
          </p>
        </div>

        <div className="bg-[rgb(245,246,248)] rounded-[34px] pl-2 pt-2 pr-2 pb-2 flex flex-col overflow-hidden">
          <div className="flex items-center gap-x-1.75">
            <div className="flex flex-col bg-white rounded-[20px] w-10 overflow-hidden">
              <img
                className="w-5.25 h-5.25 mt-2.25 mr-2.5 mb-2.5 ml-2.25"
                src={props.eventTypeImg}
                alt="alt text"
              />
            </div>

            <div className="w-62.75 flex flex-col gap-y-0.75">
              <p>
                <span className="font-semibold text-3.5 leading-1.21 font-Inter text-black line-clamp-2">
                  {props.eventName}
                </span>
              </p>

              <div className="flex gap-x-2.25">
                <p className="font-medium text-3 leading-1.25 font-Inter text-[rgb(125,139,142)] w-11.25">
                  {props.eventCategory}
                </p>
                <p className="font-medium text-3 leading-1.25 font-Inter text-[rgb(125,139,142)] w-7.75">
                  {props.eventYears}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ChooseEvent.propTypes = {
  className: PropTypes.string,
  eventTypeImg: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  eventCategory: PropTypes.string.isRequired,
  eventYears: PropTypes.string.isRequired
};

export default ChooseEvent;
