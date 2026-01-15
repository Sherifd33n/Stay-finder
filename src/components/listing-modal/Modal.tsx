"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative z-10 w-full max-w-275 rounded-2xl bg-white p-6 shadow-xl overflow-y-scroll no-scrollbar h-[80vh]">
        {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}

        {/* Content */}
        {children}

        {/* Close */}
        {/* <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800">
          ✕
        </button> */}
      </div>
    </div>
  );
}
