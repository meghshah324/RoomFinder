import React from 'react';
import { MapPin } from 'lucide-react';

function Location({ location }) {
  if (!location) return null;

  const { street, landmark, zipCode, city, state, country } = location;
  const fullAddress = `${street}, ${landmark}, ${zipCode}, ${city}, ${state}, ${country}`;

  // console.log("API Key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  const apiKey = "";

  if (!apiKey) {
    return (
      <div className="mx-4 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 text-sm">Google Maps API key not configured.</p>
      </div>
    );
  }

  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="mx-6 mb-6 bg-gray rounded-lg overflow-hidden">
     
      <div className="px-4 py-3 bg-gray-100">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray" />
          <h2 className="text-2xl font-semibold text-gray-700">Location</h2>
        </div>
      </div>

      <div className="p-4 bg-gray-100">
        <div className="text-gray-800 text-sm mb-3 font-semibold">
          {street}, {landmark}, {city}, {state} {zipCode}
        </div>
        
        <iframe
          title="Location Map"
          src={embedUrl}
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded"
        ></iframe>
      </div>
    </div>
  );
}

export default Location;