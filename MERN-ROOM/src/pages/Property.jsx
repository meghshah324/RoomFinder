import React, { useState, useEffect } from "react";
import LifeStyle from "../components/Property/lifeStyle.jsx";
import Amenities from "../components/Property/amenities.jsx";
import BasicInfo from "../components/Property/basicInfo.jsx";
import Location from "../components/Property/location.jsx";
import ImageScroller from "../components/Property/ImageScroller.jsx";
import { useParams } from "react-router-dom";

function Property() {
    const [error, setError] = useState("");
    const [room, setRoom] = useState(null);
    const [amenities, setAmenities] = useState({});
    const [lifeStyle, setLifeStyle] = useState({});
    const [basicInfo, setBasicInfo] = useState({});

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
                setBasicInfo({
                    rent: data.rent,
                    buildingType: data.buildingType,
                    roomType: data.roomType,
                    genderLookingFor: data.genderLookingFor
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
            <ImageScroller />
            <Location location={room.location} />
            <BasicInfo info={basicInfo} />
            <Amenities amenities={amenities} />
            <LifeStyle lifeStyle={lifeStyle} />
        </>
    );
}

export default Property;
