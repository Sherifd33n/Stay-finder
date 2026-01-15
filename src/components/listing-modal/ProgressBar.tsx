"use client";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export default function ProgressBar({
  step,
  totalSteps,
}: ProgressBarProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="mb-1">
      {/* Track */}
      <div className="h-2 w-full rounded-full bg-gray-200">
        {/* Fill */}
        <div
          className="h-2 rounded-full bg-[#089589] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Optional label */}
      <p className="mt-2 text-xs text-gray-500 text-right">
        {step} / {totalSteps}
      </p>
    </div>
  );
}
