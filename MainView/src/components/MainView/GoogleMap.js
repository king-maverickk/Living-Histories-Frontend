/**
 * GoogleMap Component - Optimized for performance
 * Renders Google Maps with user location and places markers
 * @param {Object} props - Component props
 * @param {Object} props.places - Places data object
 * @param {Function} props.onAddressResolved - Callback for address resolution
 * @param {Function} props.onAreaResolved - Callback for area resolution
 * @returns {JSX.Element} GoogleMap component
 */
import React, { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

// Move constant out of component so it's not treated as a changing dependency
const GOOGLE_MAPS_API_KEY = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;

/**
 * GoogleMap component wrapped with React.memo for performance optimization
 * Only re-renders when props actually change
 */
const GoogleMap = React.memo(({ places, onAddressResolved, onAreaResolved }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const placesMarkersRef = useRef([]);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * Initialize Google Map with optimized settings
   * Memoized to prevent recreation on every render
   */
  const initMap = useCallback(() => {
    if (!mapRef.current || isInitialized) return;

    const defaultCenter = { lat: 0, lng: 0 };

    const googleMap = new window.google.maps.Map(mapRef.current, {
      zoom: 15,
      center: defaultCenter,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      gestureHandling: "greedy",
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    mapInstanceRef.current = googleMap;
    setIsInitialized(true);

    // Get user location only once
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          googleMap.setCenter(userLocation);

          // Create or update user marker
          if (userMarkerRef.current) {
            userMarkerRef.current.setPosition(userLocation);
          } else {
            userMarkerRef.current = new window.google.maps.Marker({
              position: userLocation,
              map: googleMap,
              title: "Your Location",
              animation: window.google.maps.Animation.DROP,
            });
          }

          // Geocode only once per session
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: userLocation }, (results, status) => {
            if (status === "OK" && results[0]) {
              const resolvedAddress = results[0].formatted_address;

              if (onAddressResolved) {
                onAddressResolved(resolvedAddress);
              }

              let street = results[0].address_components[1]?.long_name || null;
              let town = results[0].address_components[2]?.long_name || null;

              let country = null;
              for (let component of results[0].address_components) {
                if (component.types.includes("country")) {
                  country = component.long_name;
                  break;
                }
              }

              if (street && town && onAreaResolved) {
                onAreaResolved({ street, town, country });
              }
            } else {
              if (onAddressResolved) {
                onAddressResolved("Address not found");
              }
            }
          });
        },
        (err) => {
          const msg = err.code === 1
            ? "Location permission denied"
            : `Error getting location: ${err.message}`;
          setError(msg);
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
    }
  }, [onAddressResolved, onAreaResolved, isInitialized]);

  /**
   * Update places markers when places data changes
   * Optimized to only update when necessary
   */
  const updatePlacesMarkers = useCallback(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing places markers
    placesMarkersRef.current.forEach(marker => marker.setMap(null));
    placesMarkersRef.current = [];

    // Add new places markers
    if (places?.Content?.length > 0) {
      places.Content.forEach((place) => {
        if (place.location?.coordinates) {
          const { latitude, longitude } = place.location.coordinates;
          const marker = new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: mapInstanceRef.current,
            title: place.name,
          });
          placesMarkersRef.current.push(marker);
        }
      });
    }
  }, [places]);

  /**
   * Load Google Maps API script only once
   */
  useEffect(() => {
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      if (window.google && window.google.maps) {
        initMap();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => initMap();
    script.onerror = () => setError("Failed to load Google Maps API");
    document.head.appendChild(script);

    return () => {
      // Cleanup script only if we added it
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [initMap]);

  /**
   * Update places markers when places data changes
   */
  useEffect(() => {
    if (isInitialized) {
      updatePlacesMarkers();
    }
  }, [places, isInitialized, updatePlacesMarkers]);

  return (
    <div className="absolute inset-0">
      {error && (
        <div className="absolute top-0 left-0 z-50 bg-red-500 text-white p-2 m-2 rounded">
          {error}
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" style={{ cursor: "grab" }} />
    </div>
  );
});

// Add display name for debugging
GoogleMap.displayName = 'GoogleMap';

GoogleMap.propTypes = {
  places: PropTypes.object,
  onAddressResolved: PropTypes.func,
  onAreaResolved: PropTypes.func,
};

export default GoogleMap;

