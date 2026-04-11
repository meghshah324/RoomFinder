import { createContext, useContext, useMemo, useState } from "react";

const FormContext = createContext();

const initialFormState = {
      address: {
            street: "",
            landmark: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
      },
      rent: "",
      buildingType: "",
      roomType: "",
      genderLookingFor: "",
      description: "",
      cleanliness: "",
      foodPreference: "",
      smoker: "",
      occupation: "",
      partyHabit: "",
      overnightGuest: "",
      amenities: [],
};

export const FromProvide = ({ children }) => {
      const [formData, setFormData] = useState(initialFormState);
      const [isFlowLocked, setIsFlowLocked] = useState(false);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [flowError, setFlowError] = useState("");
      const [currentStep, setCurrentStep] = useState("profile");

      const startFlow = (step = "profile") => {
            setIsFlowLocked(true);
            setCurrentStep(step);
      };

      const updateStep = (step) => {
            setCurrentStep(step);
            setIsFlowLocked(true);
      };

      const resetFlow = () => {
            setFormData(initialFormState);
            setFlowError("");
            setIsSubmitting(false);
            setCurrentStep("profile");
      };

      const cancelFlow = () => {
            resetFlow();
            setIsFlowLocked(false);
      };

      const completeFlow = () => {
            resetFlow();
            setIsFlowLocked(false);
      };

      const contextValue = useMemo(
            () => ({
                  formData,
                  setFormData,
                  isFlowLocked,
                  isSubmitting,
                  setIsSubmitting,
                  flowError,
                  setFlowError,
                  currentStep,
                  startFlow,
                  updateStep,
                  resetFlow,
                  cancelFlow,
                  completeFlow,
            }),
            [formData, isFlowLocked, isSubmitting, flowError, currentStep]
      );

      return (
            <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
      );
};

export const useFormContext = () => {
      return useContext(FormContext);
};