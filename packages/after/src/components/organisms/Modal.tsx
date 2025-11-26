import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showFooter = false,
  footerContent,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const baseModalClasses = 'bg-white rounded-[4px] shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)] max-h-[90vh] flex flex-col font-["Roboto","Helvetica","Arial",sans-serif]';
  
  const sizeClasses = {
    small: 'w-full max-w-[var(--width-modal-sm)]',
    medium: 'w-full max-w-[var(--width-modal-md)]',
    large: 'w-full max-w-[var(--width-modal-lg)]',
  };

  const modalClasses = [baseModalClasses, sizeClasses[size]].join(' ');

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[1000] p-4"
      onClick={onClose}
    >
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="p-[var(--spacing-modal-padding)] border-b border-b-[rgba(0,0,0,0.12)] flex justify-between items-center">
            <h3 className="m-0 text-[var(--font-size-modal-title)] font-medium text-[rgba(0,0,0,0.87)]">
              {title}
            </h3>
            <button
              className="bg-transparent border-none text-[var(--font-size-modal-close)] leading-[1] text-[rgba(0,0,0,0.54)] cursor-pointer p-0 w-[var(--height-modal-close)] h-[var(--height-modal-close)] rounded-full flex items-center justify-center transition-[var(--transition-modal-close)] hover:bg-[rgba(0,0,0,0.04)]"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        )}
        <div className="p-[var(--spacing-modal-padding)] overflow-y-auto flex-1">
          {children}
        </div>
        {showFooter && footerContent && (
          <div className="p-[var(--spacing-modal-padding)] border-t border-t-[rgba(0,0,0,0.12)] flex gap-[var(--spacing-modal-gap)] justify-end">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};
