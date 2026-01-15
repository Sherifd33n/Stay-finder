"use client";

import UploadMedia, { MediaFile } from "../UploadMedia";

interface StepThreeProps {
  media: MediaFile[];
  setMedia: React.Dispatch<React.SetStateAction<MediaFile[]>>;
}

export default function StepThree({ media, setMedia }: StepThreeProps) {
  return (
    <div className="">
      <div className="border-gray-200">
        <h2 className="mb-1 text-xl font-semibold text-[#101418]">
          Media Upload
        </h2>
        <p className="text-sm text-[#818891]">
          Showcase your properties with high-quality photos and videos.
        </p>
      </div>

      <div>
        <UploadMedia media={media} setMedia={setMedia} />
      </div>
    </div>
  );
}
