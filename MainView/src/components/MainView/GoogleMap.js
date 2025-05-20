import React, { useRef, useState, useEffect } from "react";

const GoogleMap = ({ places, onAddressResolved, onAreaResolved }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    // Track if it’s already loaded
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) return;

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

              // 🔁 Send address back to parent
              if (onAddressResolved) {
                onAddressResolved(resolvedAddress);
              }

              // Extract town and province
              let town = null;
              let province = null;

              for (const component of results[0].address_components) {
                if (component.types.includes("locality")) {
                  town = component.long_name;
                } else if (component.types.includes("administrative_area_level_1")) {
                  province = component.long_name;
                }
              }

              if (town && province && onAreaResolved) {
                onAreaResolved({ town, province });
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

    // Show markers from `places`
    if (places?.Content?.length > 0) {
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
