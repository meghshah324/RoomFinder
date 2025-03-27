import React from 'react';
import { Car, Wifi, AirVent, WashingMachine, Tv, Refrigerator } from 'lucide-react';

export default function Amenities({ amenities }) {
    const amenitiesArr = [
        { key: "parking", icon: <Car className="w-6 h-6" />, label: "Parking" },
        { key: "washingMachine", icon: <WashingMachine className="w-6 h-6" />, label: "Washing Machine" },
        { key: "wifi", icon: <Wifi className="w-6 h-6" />, label: "WiFi" },
        { key: "ac", icon: <AirVent className="w-6 h-6" />, label: "AC" },
        { key: "tv", icon: <Tv className="w-6 h-6" />, label: "TV" },
        { key: "fridge", icon: <Refrigerator className="w-6 h-6" />, label: "Fridge" },
    ];

    return (
        <div className="p-5 w-auto bg-gray-100 rounded-lg shadow-sm m-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {amenitiesArr.map((amenity, index) => (
                    amenities[amenity.key] && (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 bg-gray-50 hover:bg-gray-100"
                        >
                            {amenity.icon}
                            <span className="text-gray-700 font-medium">{amenity.label}</span>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
