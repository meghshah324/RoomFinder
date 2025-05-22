import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FromProvide = ({ children }) => {
      const [formData, setFormData] = useState({
            address:{
                  street: '',
                  landmark: '',
                  city: '',
                  state: '',
                  postalCode: '',
                  country: '',
            },
            rent: '',
            buildingType: '',
            roomType: '',
            genderLookingFor:'',
            description: '',
            cleanliness: '',
            foodPreference: '',
            smoker: '',
            occupation: '',
            partyHabit: '',
            overnightGuest: '',
            amenities : [
            ]
      });
      console.log(formData);
      return (
            <FormContext.Provider value={{ formData, setFormData }} >
                  {children}
            </FormContext.Provider>
      );
}
export const useFormContext = () => {
      return useContext(FormContext);
}