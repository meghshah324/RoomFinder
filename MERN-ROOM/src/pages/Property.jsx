import React, { useState, useEffect } from "react";
import LifeStyle from "../components/Property/lifeStyle.jsx";
import Amenities from "../components/Property/amenities.jsx";
import BasicInfo from "../components/Property/basicInfo.jsx";
import Location from "../components/Property/location.jsx";
import ImageScroller from "../components/Property/ImageScroller.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useParams } from "react-router-dom";

function Property() {
  const [error, setError] = useState("");
  const [room, setRoom] = useState(null);
  const [amenities, setAmenities] = useState({});
  const [lifeStyle, setLifeStyle] = useState({});
  const [basicInfo, setBasicInfo] = useState({});
  const [images, setImages] = useState([]);
  const [roomIdDetails, setRoomIdDetails] = useState({});
  const { userId } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/listing/room/${id}`);
        if (!res.ok) throw new Error("Failed to fetch room");
        const data = await res.json();

        setRoom(data);
        setAmenities(data.amenities || {});
        setLifeStyle(data.lifestyle || {});
        setImages(data.photos || []);
        const newRoomIdDetails = {
          sellerId: data.postedBy._id,
          sellerName: data.postedBy.username,
          buyerId: userId,
          roomId: id,
        };
        setRoomIdDetails(newRoomIdDetails);
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
  }, [id, userId]);

  if (error) return <p>Error: {error}</p>;
  if (!room) return <p>Loading...</p>;

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row gap-4 md:gap-6 p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
        {/* Left sidebar - Profile Card */}
        <div className="w-full lg:w-1/5">
          <div className="sticky top-4 rounded-xl lg:rounded-2xl bg-white shadow-sm p-4">
            <ProfileCard roomIdDetails={roomIdDetails} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-4 md:space-y-6 w-full max-w-screen-lg mx-auto">
          {/* Image gallery section */}
          <div className="rounded-xl lg:rounded-2xl shadow-sm bg-white p-3 md:p-4">
            <ImageScroller images={images} />
          </div>

          {/* Property details sections */}
          <div className="rounded-xl lg:rounded-2xl shadow-sm bg-white p-4 md:p-6 space-y-4 md:space-y-6">
            <Location location={room.address} />
            <BasicInfo info={basicInfo} />
            <Amenities amenities={amenities} />
            <LifeStyle lifeStyle={lifeStyle} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Property;
