import mongoose from "mongoose";

const amenitiesSchema = mongoose.Schema({
    parking: {
        type: Boolean,
    },
    washingMachine: {
        type: Boolean,
    },
    wifi: {
        type: Boolean,
    },
    ac: {
        type: Boolean,
    },
    tv: {
        type: Boolean,
    },
    fridge: {
        type: Boolean,
    },
})

const Amenities = mongoose.model("Amenity", amenitiesSchema);

export default Amenities;