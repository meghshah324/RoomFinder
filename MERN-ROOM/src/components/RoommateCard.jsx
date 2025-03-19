import React from "react";
import { IndianRupee, MapPinned } from "lucide-react";
import img1 from "../assets/img1.jpeg";


export default function RoommateCard() {
    const roommates = [
        {
            id: 1,
            name: "Megh Shah",
            location: "Ahmedabad, Gujarat, India",
            rent: 15000,
            gender: "Male",
            occupation: "Engineer"
        },
        {
            id: 2,
            name: "Arjun Patel",
            location: "Ahmedabad, Gujarat, India",
            rent: 35000,
            gender: "Male",
            occupation: "Engineer"
        },
        {
            id: 3,
            name: "Priya Sharma",
            location: "Ahmedabad, Gujarat, India",
            rent: 35000,
            gender: "Male",
            occupation: "Engineer"
        },
        {
            id: 4,
            name: "Arjun Patel",
            location: "Ahmedabad, Gujarat, India",
            rent: 35000,
            gender: "Male",
            occupation: "Engineer"
        },
        {
            id: 5,
            name: "Priya Sharma",
            location: "Ahmedabad, Gujarat, India",
            rent: 15000,
            gender: "Male",
            occupation: "Engineer"
        }
    ];
    return (
        <div className="bg-white  rounded-xl m-4 p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Available Roommates</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roommates.map((roommate) => (
                    <div key={roommate.id} className="bg-gray-50 shadow rounded-xl p-4 hover:shadow-md  transition-transform duration-400 hover:scale-105 hover:shadow-xl">
                        <div className="flex flex-col sm:flex-row items-center">
                            <div className="w-24 h-24 overflow-hidden rounded-lg mb-4 sm:mb-0">
                                <img 
                                    src={img1}
                                    alt={`${roommate.name}`} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="sm:ml-4 flex-1">
                                <h2 className="text-lg font-semibold">{roommate.name}</h2>
                                <div className="text-gray-600 flex items-center text-sm mt-1">
                                    <MapPinned size={14} className="mr-1" />
                                    <p>{roommate.location}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 mt-4 text-sm ">
                            <div className="flex flex-col items-start">
                                <span className="text-gray-500 text-xs">Rent</span>
                                <div className="flex items-center text-gray-800 font-semibold">
                                    <IndianRupee size={14} className="mr-1" /> 
                                    {roommate.rent.toLocaleString()}
                                </div>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-500 text-xs">Looking for</span>
                                <span className="font-semibold">{roommate.gender}</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-500 text-xs">Occupation</span>
                                <span className="font-semibold">{roommate.occupation}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}