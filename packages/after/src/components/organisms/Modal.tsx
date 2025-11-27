import { cn } from "@/lib/utils";
import React, { createContext, useContext, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
  size: "small" | "medium" | "large";
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within Modal");
  }
  return context;
};

// Root Modal Component
interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

const ModalRoot: React.FC<ModalRootProps> = ({ isOpen, onClose, size = "medium", children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const baseModalClasses =
    'bg-white rounded-[4px] shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)] max-h-[90vh] flex flex-col font-["Roboto","Helvetica","Arial",sans-serif]';

  const sizeClasses = {
    small: "w-full max-w-[var(--width-modal-sm)]",
    medium: "w-full max-w-[var(--width-modal-md)]",
    large: "w-full max-w-[var(--width-modal-lg)]",
  };

  const modalClasses = cn(baseModalClasses, sizeClasses[size]);

  const modalContent = (
    <ModalContext.Provider value={{ isOpen, onClose, size }}>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-4"
        onClick={onClose}
      >
        <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );

  return createPortal(modalContent, document.body);
};

// Modal Header Component
interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => {
  const { onClose } = useModalContext();

  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-b-[rgba(0,0,0,0.12)] p-[var(--spacing-modal-padding)]",
        className,
      )}
    >
      <div className="flex-1">{children}</div>
      <button
        className="flex h-[var(--height-modal-close)] w-[var(--height-modal-close)] cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 leading-[1] text-[rgba(0,0,0,0.54)] text-[var(--font-size-modal-close)] transition-[var(--transition-modal-close)] hover:bg-[rgba(0,0,0,0.04)]"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};

// Modal Title Component
interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ children, className }) => {
  return (
    <h3 className={cn("m-0 font-medium text-[rgba(0,0,0,0.87)] text-[var(--font-size-modal-title)]", className)}>
      {children}
    </h3>
  );
};

// Modal Body Component
interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => {
  return <div className={cn("flex-1 overflow-y-auto p-[var(--spacing-modal-padding)]", className)}>{children}</div>;
};

// Modal Footer Component
interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex justify-end gap-[var(--spacing-modal-gap)] border-t border-t-[rgba(0,0,0,0.12)] p-[var(--spacing-modal-padding)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

// Export as compound component
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Title: ModalTitle,
  Body: ModalBody,
  Footer: ModalFooter,
});
