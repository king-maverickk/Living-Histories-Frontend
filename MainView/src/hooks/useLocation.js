/**
 * Custom hook for managing location state and data
 * @returns {Object} Location state and handlers
 */
import { useState } from 'react';

export const useLocation = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [street, setStreet] = useState(null);
  const [town, setTown] = useState(null);
  const [country, setCountry] = useState(null);

  /**
   * Handle area resolution from map component
   * @param {Object} area - Area object containing street, town, and country
   */
  const handleAreaResolved = (area) => {
    setStreet(area.street);
    setTown(area.town);
    setCountry(area.country);
  };

  return {
    userAddress,
    street,
    town,
    country,
    setUserAddress,
    handleAreaResolved
  };
};

export default useLocation;

