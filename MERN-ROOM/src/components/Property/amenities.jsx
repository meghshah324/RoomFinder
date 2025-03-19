import React from 'react'
import { User2, Users, Wallet, Search } from 'lucide-react';
import { Car, Wifi, AirVent, WashingMachine, Tv, Refrigerator, MapPin, Navigation2 } from 'lucide-react';

export default function Amenities() {
    const amenities = [
        { icon: <Car className="w-6 h-6" />, label: "Parking" },
        { icon: <WashingMachine className="w-6 h-6" />, label: "Washing Machine" },
        { icon: <Wifi className="w-6 h-6" />, label: "WiFi" },
        { icon: <AirVent className="w-6 h-6" />, label: "AC" },
        { icon: <Tv className="w-6 h-6" />, label: "TV" },
        { icon: <Refrigerator className="w-6 h-6" />, label: "Fridge" }
    ];
    return (
        <>
            <div className="p-5 w-[70%] bg-gray-100 rounded-lg shadow-sm m-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {amenities.map((amenity, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 bg-gray-50 hover:bg-gray-100"
                        >
                            {amenity.icon}
                            <span className="text-gray-700 font-medium">
                                {amenity.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

