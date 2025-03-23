import React, { useEffect, useState } from "react";
import { IndianRupee, MapPinned } from "lucide-react";
import img1 from "../assets/img1.jpeg";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function RoommateCard() {
    const { userName, loading, user } = useAuthContext();
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/listing/rooms');
                if (!res.ok) throw new Error("Failed to fetch rooms");
                const data = await res.json();
                setRooms(data || []);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching rooms:", error);
            }
        };
        fetchRooms();
    }, []);

    return (
        <div className="bg-white rounded-xl m-4 p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Available Roommates</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                    <div
                        key={room._id}
                        onClick={() => navigate(`/property/${room._id}`)} 
                        className="cursor-pointer bg-gray-50 shadow rounded-xl p-4 hover:shadow-md transition-transform duration-400 hover:scale-105 hover:shadow-xl"
                    >
                        <div className="flex flex-col sm:flex-row items-center">
                            <div className="w-24 h-24 overflow-hidden rounded-lg mb-4 sm:mb-0">
                                <img
                                    src={img1}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="sm:ml-4 flex-1">
                                <h2 className="text-lg font-semibold">{room?.postedBy?.username}</h2>
                                <div className="text-gray-600 flex items-center text-sm mt-1">
                                    <MapPinned size={14} className="mr-1" />
                                    <p>{room.location}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 mt-4 text-sm ">
                            <div className="flex flex-col items-start">
                                <span className="text-gray-500 text-xs">Rent</span>
                                <div className="flex items-center text-gray-800 font-semibold">
                                    <IndianRupee size={14} className="mr-1" />
                                    {room.rent.toLocaleString()}
                                </div>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-500 text-xs">Looking for</span>
                                <span className="font-semibold">{room.genderLookingFor}</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-500 text-xs">Occupation</span>
                                <span className="font-semibold">{room.occupation}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
