import React from "react";

// Select Component - Inconsistent with Input component
interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  size?: "sm" | "md" | "lg";
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  placeholder = "Select an option...",
  required = false,
  disabled = false,
  error,
  helpText,
  size = "md",
}) => {
  void size; // Keep for API consistency but not used in rendering

  const selectClasses = [
    "w-full px-2.5 py-2 text-[length:var(--font-size-form-input)] font-[Arial] text-black border border-[var(--color-gray-300)] rounded-[3px] bg-white box-border",
    "focus:border-[var(--color-primary-500)] focus:outline-none",
    error && "border-[var(--color-danger-500)]",
    "disabled:bg-[var(--color-secondary-50)] disabled:cursor-not-allowed",
  ]
    .filter(Boolean)
    .join(" ");

  const helperClasses = [
    "text-[length:var(--font-size-form-helper)] font-[Arial] mt-1 block",
    error ? "text-[var(--color-danger-500)]" : "text-[var(--color-gray-500)]",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mb-[var(--spacing-form-group)]">
      {label && (
        <label className="block mb-[var(--spacing-form-label-mb)] text-[var(--color-gray-600)] text-[length:var(--font-size-form-label)] font-bold font-[Arial]">
          {label}
          {required && (
            <span className="text-[var(--color-danger-500)]">*</span>
          )}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={selectClasses}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className={helperClasses}>{error}</span>}
      {helpText && !error && <span className={helperClasses}>{helpText}</span>}
    </div>
  );
};
