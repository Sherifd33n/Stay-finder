"use client";

import { useState } from "react";
import Modal from "./Modal";
import StepOne from "./steps/stepOne";
import StepTwo from "./steps/stepTwo";
import StepThree from "./steps/stepThree";
import StepFour from "./steps/stepFour";
import StepFive from "./steps/stepFive";
import ProgressBar from "./ProgressBar";
import { MediaFile } from "./UploadMedia";

export default function ListingSteps({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const next = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const [active, setActive] = useState<"rent" | "sell">("rent");

  const [category] = useState<
    | "house"
    | "apartment"
    | "hotel"
    | "warehouse"
    | "land"
    | "office"
    | "retail"
    | "others"
  >("house");

  const [location, setLocation] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    unit: "",
  });

  const [media, setMedia] = useState<MediaFile[]>([]);

  const [details, setDetails] = useState({
    price: "",
    area: "",
    bedrooms: 3,
    bathrooms: 3,
    description: "",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ProgressBar step={step} totalSteps={totalSteps} />

      <div className="min-h-45">
        {step === 1 && <StepOne active={active} setActive={setActive} />}
        {step === 2 && (
          <StepTwo location={location} setLocation={setLocation} />
        )}
        {step === 3 && <StepThree media={media} setMedia={setMedia} />}
        {step === 4 && (
          <StepFour active={active} details={details} setDetails={setDetails} />
        )}
        {step === 5 && (
          <StepFive
            active={active}
            category={category}
            location={location}
            media={media}
            details={details}
          />
        )}
      </div>

      <div className="mt-7 flex justify-between border-t pt-5 border-gray-200">
        <button
          onClick={back}
          disabled={step === 1}
          className="rounded-lg border px-4 py-2 disabled:opacity-50">
          Back
        </button>

        {step < totalSteps ? (
          <button
            onClick={next}
            className="rounded-lg bg-[#089589] px-6 py-2 text-white cursor-pointer">
            Next
          </button>
        ) : (
          <button
            onClick={onClose}
            className="rounded-lg bg-[#089589] px-6 py-2 text-white cursor-pointer">
            Finish
          </button>
        )}
      </div>
    </Modal>
  );
}
