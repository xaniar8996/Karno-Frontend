"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type DeleteType = "user" | "CV";

interface DeleteModalData {
  id: string;
  name?: string; // username for user, CV name for CV
  type: DeleteType;
}

interface DeleteModalContextType {
  isOpen: boolean;
  data: DeleteModalData | null;
  openModal: (data: DeleteModalData) => void;
  closeModal: () => void;
}

const DeleteModalContext = createContext<DeleteModalContextType | undefined>(undefined);

export function DeleteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DeleteModalData | null>(null);

  const openModal = (modalData: DeleteModalData) => {
    setData(modalData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Clear data after animation completes
    setTimeout(() => setData(null), 300);
  };

  return (
    <DeleteModalContext.Provider value={{ isOpen, data, openModal, closeModal }}>
      {children}
    </DeleteModalContext.Provider>
  );
}

export function useDeleteModal() {
  const context = useContext(DeleteModalContext);
  if (!context) {
    throw new Error("useDeleteModal must be used within DeleteModalProvider");
  }
  return context;
}
