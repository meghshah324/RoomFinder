import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FromProvide = ({ children }) => {
      const [formData, setFormData] = useState({
            location: '',
            rent: '',
            buildingType: '',
            roomType: '',
            roomateGender: '',
            description: '',
            cleanliness: '',
            foodPref: '',
            smoker: '',
            occupation: '',
            partyHabit: '',
            overnightGuest: '',
            amenities : [

            ]
      });
      return (
            <FormContext.Provider value={{ formData, setFormData }} >
                  {children}
            </FormContext.Provider>
      );
}
export const useFormContext = () => {
      return useContext(FormContext);
}