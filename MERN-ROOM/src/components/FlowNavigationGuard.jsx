import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";

const stepPathMap = {
  profile: "/form/profile",
  address: "/form/address",
  profile2: "/form/profile2",
  profile3: "/form/profile3",
};

export default function FlowNavigationGuard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isFlowLocked, currentStep } = useFormContext();

  useEffect(() => {
    if (!isFlowLocked) return;

    if (location.pathname === "/") {
      navigate(stepPathMap[currentStep] || "/form/profile", { replace: true });
    }
  }, [isFlowLocked, location.pathname, currentStep, navigate]);

  useEffect(() => {
    if (!isFlowLocked) return undefined;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFlowLocked]);

  return null;
}
