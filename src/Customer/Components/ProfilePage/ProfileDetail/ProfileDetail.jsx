import React, { useEffect, useState } from "react";
import PersonelDetail from "./PersonelDetail";
import Address from "./Address";
import Education from "./Education";
import "./ProfileDetail.css"; // Assuming you have a CSS file for styling
import { useNavigate, useParams } from "react-router-dom";

const ProfileDetail = () => {
  const  {stepNumber} = useParams();
  const navigate = useNavigate();
  console.log(stepNumber);

  const steps = ["Personal", "Address", "Education"];
  const [step, setStep] = useState(1); // Default to step 1

  useEffect(() => {
    if (step !== Number(stepNumber)) {
      setStep(Number(stepNumber))
    }
  }, [stepNumber])

  return (
    <div>
      <div className="stepper">
        {steps.map((label, index) => (
          <div
            key={index}
            className={`step ${step === index + 1 ? "active" : ""} ${
              step < index + 1 ? "disabled" : "completed"
            }`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{label}</div>
          </div>
        ))}
      </div>
      <div>
        {step === 1 && <PersonelDetail /> }
        {step === 2 && <Address /> }
        {step === 3 && <Education />}
      </div>
    </div>
  );
};

export default ProfileDetail;
