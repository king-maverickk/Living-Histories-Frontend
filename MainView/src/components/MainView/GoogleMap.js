import React, { useRef, useState, useEffect } from "react";

const GoogleMap = ({ places, onAddressResolved }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
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

    const defaultCenter = { lat: 0, lng: 0 };

    const googleMap = new window.google.maps.Map(mapRef.current, {
      zoom: 14,
      center: defaultCenter,
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: true,
      gestureHandling: "greedy",
    });

    setMap(googleMap);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setLocation(userLocation);
          
          // Center map on user's location
          googleMap.setCenter(userLocation);

          new window.google.maps.Marker({
            position: userLocation,
            map: googleMap,
            title: "Your Location",
            animation: window.google.maps.Animation.DROP,
          });

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: userLocation }, (results, status) => {
            if (status === "OK" && results[0]) {
              const resolvedAddress = results[0].formatted_address;
              setAddress(resolvedAddress);

              // 🔁 Send address back to parent
              if (onAddressResolved) {
                onAddressResolved(resolvedAddress);
              }
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

    // Add markers for places
    if (places && Array.isArray(places.Content)) {
      places.Content.forEach((place) => {
        const { latitude, longitude } = place.location.coordinates;
        new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: googleMap,
          title: place.name,
        });
      });
    }
  };

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
};

export default GoogleMap;
