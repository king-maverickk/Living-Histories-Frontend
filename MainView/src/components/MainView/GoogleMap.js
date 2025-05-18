import React, { useEffect, useRef, useState } from "react";

const GoogleMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const GOOGLE_MAPS_API_KEY = "AIzaSyBL4uigx0KtpZFwJ1La4LgOV3r98yI6_lQ";

  // Initialize Google Maps JavaScript API
  useEffect(() => {
    // Load Google Maps JavaScript API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => initMap();
    script.onerror = () => setError("Failed to load Google Maps API");
    document.head.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  // Initialize map once API is loaded
  const initMap = () => {
    if (!mapRef.current) return;

    // Default center (will be replaced with user location when available)
    const defaultCenter = { lat: 0, lng: 0 };
    
    // Create map instance
    const googleMap = new window.google.maps.Map(mapRef.current, {
      zoom: 14,
      center: defaultCenter,
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: true,
      zoomControl: true,
      gestureHandling: "greedy" // Makes mobile interaction easier
    });
    
    setMap(googleMap);
    
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          setLocation(userLocation);
          
          // Center map on user's location
          googleMap.setCenter(userLocation);
          
          // Add marker at user's location
          new window.google.maps.Marker({
            position: userLocation,
            map: googleMap,
            title: "Your Location",
            animation: window.google.maps.Animation.DROP
          });
          
          // Get address for user's location
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: userLocation }, (results, status) => {
            if (status === "OK" && results[0]) {
              setAddress(results[0].formatted_address);
            } else {
              setAddress("Address not found");
            }
          });
        },
        (err) => {
          if (err.code === 1) {
            setError("Location permission denied");
          } else {
            setError(`Error getting location: ${err.message}`);
          }
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
    }
  };

  return (
    <div className="absolute inset-0">
      {error && (
        <div className="absolute top-0 left-0 z-50 bg-red-500 text-white p-2 m-2 rounded">
          {error}
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ cursor: "grab" }}
      />
    </div>
  );
};

export default GoogleMap;
