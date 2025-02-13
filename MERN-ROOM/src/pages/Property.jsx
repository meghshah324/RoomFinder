import React from "react";
import { User2, Users, Wallet, Search } from 'lucide-react';
import { Car, Wifi, AirVent, WashingMachine, Tv, Refrigerator, MapPin, Navigation2 } from 'lucide-react';

function Property() {
    const amenities = [
        { icon: <Car className="w-6 h-6" />, label: "Parking" },
        { icon: <WashingMachine className="w-6 h-6" />, label: "Washing Machine" },
        { icon: <Wifi className="w-6 h-6" />, label: "WiFi" },
        { icon: <AirVent className="w-6 h-6" />, label: "AC" },
        { icon: <Tv className="w-6 h-6" />, label: "TV" },
        { icon: <Refrigerator className="w-6 h-6" />, label: "Fridge" }
    ];

    return (
        <div className="w-3/4">
            <div className="m-10 p-6 flex-col">
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Location
                    </h3>
                    <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                        <div className="space-y-2">
                            <div className="text-lg text-gray-700">
                                Ahmedabad, Gujarat, India
                            </div>
                        </div>
                        {/* <div className="mt-4 flex  gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                                <Navigation2 className="w-4 h-4" />
                                Get Directions
                            </button>

                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                View on Map
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="bg-white m-10 p-6  ">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                    Basic Info
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <div className="flex items-start gap-3">
                        <User2 className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-500">Gender</span>
                            <span className="font-medium text-gray-800">Female</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-500">Occupancy</span>
                            <span className="font-medium text-gray-800">Any</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Wallet className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-500">Approx Rent</span>
                            <span className="font-medium text-gray-800">₹ 30000</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Search className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-500">Looking For</span>
                            <span className="font-medium text-gray-800">Female</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-sm m-10">
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
            
        </div >
    );
}

export default Property;
