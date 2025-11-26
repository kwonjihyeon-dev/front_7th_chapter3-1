import React from "react";

// Checkbox Component - Completely different approach again
interface FormCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  checked,
  onChange,
  label,
  disabled = false,
  error,
  hint,
}) => {
  const wrapperClasses = [
    "flex items-start mb-[var(--spacing-checkbox-mb)] cursor-pointer",
    disabled && "opacity-60 cursor-not-allowed",
  ]
    .filter(Boolean)
    .join(" ");

  const customClasses = [
    "h-[var(--height-checkbox)] w-[var(--height-checkbox)] border-2 rounded-[2px] flex items-center justify-center transition-[var(--transition-checkbox)] cursor-pointer bg-white",
    checked
      ? "bg-[var(--color-primary-500)] border-[var(--color-primary-500)]"
      : "border-[#d1d5db]",
    disabled && "cursor-not-allowed",
  ]
    .filter(Boolean)
    .join(" ");

  const checkmarkClasses = [
    "text-white text-[var(--font-size-checkbox-checkmark)] font-bold",
    checked ? "block" : "hidden",
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    'text-[var(--font-size-checkbox-label)] cursor-pointer leading-[1.4] select-none font-["Roboto","Helvetica","Arial",sans-serif]',
    error ? "text-[#ef4444]" : "text-[var(--color-gray-700)]",
    disabled && "cursor-not-allowed",
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div>
      <div className={wrapperClasses} onClick={handleClick}>
        <div className="relative mr-[var(--spacing-checkbox-mr)] mt-[var(--spacing-checkbox-mt)]">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={() => {}} // Handled by onClick
            disabled={disabled}
            className="absolute opacity-0 cursor-pointer h-0 w-0"
          />
          <div className={customClasses}>
            <span className={checkmarkClasses}>✓</span>
          </div>
        </div>
        <label className={labelClasses}>{label}</label>
      </div>

      {error && (
        <span className='text-[#ef4444] text-[var(--font-size-checkbox-hint)] mt-[var(--spacing-checkbox-mt)] ml-6 block font-["Roboto","Helvetica","Arial",sans-serif]'>
          {error}
        </span>
      )}
      {hint && !error && (
        <span className='text-[var(--color-gray-800)] text-[var(--font-size-checkbox-hint)] mt-[var(--spacing-checkbox-mt)] ml-6 block font-["Roboto","Helvetica","Arial",sans-serif]'>
          {hint}
        </span>
      )}
    </div>
  );
};
