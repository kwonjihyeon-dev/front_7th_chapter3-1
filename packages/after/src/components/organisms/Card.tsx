import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'flat';
  headerActions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = 'default',
  headerActions,
}) => {
  const baseClasses = 'rounded-[4px] mb-[var(--spacing-card-mb)] overflow-hidden bg-white font-["Roboto","Helvetica","Arial",sans-serif]';
  
  const variantClasses = {
    default: 'border border-[rgba(0,0,0,0.12)] shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]',
    bordered: 'border border-[rgba(0,0,0,0.12)] shadow-none',
    elevated: 'border border-[rgba(0,0,0,0.08)] shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.12),0px_1px_2px_0px_rgba(0,0,0,0.08),0px_1px_4px_0px_rgba(0,0,0,0.08)]',
    flat: 'border border-[rgba(0,0,0,0.08)] shadow-none bg-[var(--color-gray-50)]',
  };

  const cardClasses = [baseClasses, variantClasses[variant]].join(' ');

  return (
    <div className={cardClasses}>
      {(title || subtitle || headerActions) && (
        <div className="p-[var(--spacing-card-padding)] border-b border-[rgba(0,0,0,0.08)] flex justify-between items-center bg-[var(--color-gray-50)]">
          <div>
            {title && (
              <h3 className="m-0 text-[var(--font-size-card-title)] font-medium leading-[1.6] text-[rgba(0,0,0,0.87)]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 mb-0 text-[var(--font-size-card-subtitle)] font-normal leading-[1.43] text-[rgba(0,0,0,0.6)]">
                {subtitle}
              </p>
            )}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="p-[var(--spacing-card-padding)]">{children}</div>
    </div>
  );
};
