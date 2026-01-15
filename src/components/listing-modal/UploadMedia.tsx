"use client";


import { FaCloudUploadAlt } from "react-icons/fa";

export type MediaFile = {
  file: File;
  preview: string;
  type: "image" | "video";
};

interface UploadMediaProps {
  media: MediaFile[];
  setMedia: React.Dispatch<React.SetStateAction<MediaFile[]>>;
}

export default function UploadMedia({ media, setMedia }: UploadMediaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files: MediaFile[] = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setMedia((prev) => [...prev, ...files]);
  };

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="mediaUpload"
        className="block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-[#089589]">
        <div className="mx-auto text-center h-15 w-15 rounded-full flex justify-center items-center text-[#089589] bg-[#e7f2fd]">
          <FaCloudUploadAlt className="text-[#089589]" size={30} />
        </div>
        Upload images & videos
        <p className="text-xs text-gray-500 mt-1">JPG, PNG, MP4 (Max 50MB)</p>
      </label>

      <input
        type="file"
        id="mediaUpload"
        accept="image/*,video/mp4,video/webm"
        multiple
        onChange={handleChange}
        className="hidden"
      />

      {media.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {media.map((item, index) => (
            <div
              key={index}
              className="relative h-24 w-full rounded overflow-hidden border">
              {item.type === "image" ? (
                <img
                  src={item.preview}
                  alt="preview"
                  className="object-cover w-full h-full"
                  
                />
              ) : (
                <video
                  src={item.preview}
                  className="h-full w-full object-cover"
                  controls
                />
              )}

              <button
                onClick={() => removeMedia(index)}
                className="absolute right-1 top-1 rounded bg-black/60 px-2 text-xs text-white">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
