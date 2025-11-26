import React from "react";

// Textarea Component - Yet another inconsistent API
interface FormTextareaProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  rows = 4,
}) => {
  const textareaClasses = [
    'w-full min-h-[6em] py-4 px-3.5 text-[length:var(--font-size-form-textarea)] font-["Roboto","Helvetica","Arial",sans-serif] font-normal leading-[1.1876em] text-[rgba(0,0,0,0.87)] border border-[rgba(0,0,0,0.23)] rounded-[4px] bg-white box-border transition-[border-color] duration-200 ease-[cubic-bezier(0,0,0.2,1)] outline-none resize-y',
    "focus:border-[var(--color-primary-500)] focus:border-2 focus:py-[15.5px] focus:px-[13px]",
    error && "border-[var(--color-danger-500)]",
    "disabled:bg-[rgba(0,0,0,0.12)]",
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

      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={textareaClasses}
      />

      {error && <span className={helperClasses}>{error}</span>}
      {helpText && !error && <span className={helperClasses}>{helpText}</span>}
    </div>
  );
};
