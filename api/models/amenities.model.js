import mongoose from "mongoose";

const amenitiesSchema = mongoose.Schema({
     parking : {
         type : Boolean,
         require : true
     },
     washingMachine : {
        type : Boolean,
        require : true
    },
    wifi : {
        type : Boolean,
        require : true
    },
    ac : {
        type : Boolean,
        require : true
    },
    tv : {
        type : Boolean,
        require : true
    },
    fridge : {
        type : Boolean,
        require : true
    },
})

const Amenities = mongoose.model("Amenity",amenitiesSchema);

export default Amenities;