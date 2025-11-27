import type { ManagementMode } from "@/types";
import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ManagementMode>(null);

  const openModal = (mode: ManagementMode) => {
    setMode(mode);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMode(null);
  };

  return { isOpen, mode, openModal, closeModal };
};
