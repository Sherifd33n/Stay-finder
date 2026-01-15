"use client";

import { FaMinus, FaPlus } from "react-icons/fa";

interface QuantityInputProps {
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
}

export default function QuantityInput({
  min = 1,
  max = 10,
  value,
  onChange,
}: QuantityInputProps) {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center justify-between w-full rounded border border-gray-300 px-2 py-1">
      <button
        onClick={decrease}
        disabled={value === min}
        className="flex h-8 w-8 items-center justify-center rounded-full border text-gray-500 disabled:opacity-40"
      >
        <FaMinus size={14} />
      </button>

      <span className="text-sm font-medium">{value}</span>

      <button
        onClick={increase}
        disabled={value === max}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#089589] text-white disabled:opacity-40"
      >
        <FaPlus size={14} />
      </button>
    </div>
  );
}
