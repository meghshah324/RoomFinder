import React, { useState, useEffect } from "react";
import LifeStyle from "../components/Property/lifeStyle.jsx";
import Amenities from "../components/Property/amenities.jsx";
import BasicInfo from "../components/Property/basicInfo.jsx";
import Location from "../components/Property/location.jsx";
import ImageScroller from "../components/Property/ImageScroller.jsx";
import ChatbotUI from "../components/ChatCard.jsx";
import { useParams } from "react-router-dom";

function Property() {
  const [error, setError] = useState("");
  const [room, setRoom] = useState(null);
  const [amenities, setAmenities] = useState({});
  const [lifeStyle, setLifeStyle] = useState({});
  const [basicInfo, setBasicInfo] = useState({});

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/listing/room/${id}`);
        if (!res.ok) throw new Error("Failed to fetch room");

        const data = await res.json();
        setRoom(data);
        setAmenities(data.amenities || {});
        setLifeStyle(data.lifestyle || {});
        setBasicInfo({
          rent: data.rent,
          buildingType: data.buildingType,
          roomType: data.roomType,
          genderLookingFor: data.genderLookingFor,
        });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchRoom();
  }, [id]);


  if (error) return <p>Error: {error}</p>;
  if (!room) return <p>Loading...</p>;

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8 bg-gray-50 min-h-screen">
        <div className="flex-1 space-y-4">
          <div className="rounded-2xl shadow-md bg-white p-4">
            <ImageScroller />
          </div>
          <div className="rounded-2xl shadow-md bg-white p-4 space-y-4">
            <Location location={room.location} />
            <BasicInfo info={basicInfo} />
            <Amenities amenities={amenities} />
            <LifeStyle lifeStyle={lifeStyle} />
          </div>
        </div>

        {/* Right Section - Chatbot */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-4 rounded-2xl shadow-md bg-white p-4 h-full">
            <ChatbotUI info={id}  />
          </div>
        </div>
      </div>
    </>
  );
}

export default Property;
