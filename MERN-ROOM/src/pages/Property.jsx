import React from "react";
import LifeStyle from "../components/Property/lifeStyle.jsx";
import Amenities from "../components/Property/amenities.jsx";
import BasicInfo from "../components/Property/basicInfo.jsx";
import Location from "../components/Property/location.jsx";
import ImageScroller from "../components/Property/ImageScroller.jsx";

function Property() {
    return (
        <>
            <ImageScroller/>
            <Location/>
            <BasicInfo />
            <Amenities />
            <LifeStyle />
         </>
    );
}

export default Property;
