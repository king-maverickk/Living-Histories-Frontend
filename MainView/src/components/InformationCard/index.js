import React from 'react';

const InformationCard = ({ placeName, distance, overview, playButtonSrc = '/assets/MainView/play_button.png' }) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl w-64 overflow-hidden pointer-events-auto">
      <div className="flex flex-col gap-y-4 mt-7 mr-2 ml-4">
        <div className="flex gap-x-2.5">
          <div className="bg-blue-100 rounded-xl w-10 h-10" />

          <div className="w-52 flex flex-col gap-y-1 mb-1">
            {/* Container for basic information related to the place */}
            <p className="font-medium text-base leading-tight font-sans text-blue-400">
              {placeName || "Name of Place"}
            </p>
            <p className="text-xs leading-tight font-sans text-black opacity-20">
              {distance || "x m away"}
            </p>
          </div>
        </div>

        <div className="flex gap-x-2 mx-0.5">
          <p className="font-semibold text-sm leading-tight font-sans text-gray-400 tracking-tight w-52 h-24 my-px">
            {/* Overview of the place from the database */}
            {overview || "Overview: A story of the 2nd Johannesburg Biennale. Some events took place nearby. Let's dive deep!"}
          </p>
          <img
            className="w-4 h-4"
            src={playButtonSrc}
            alt="Play button"
          />
        </div>
      </div>
    </div>
  );
};

export default InformationCard;