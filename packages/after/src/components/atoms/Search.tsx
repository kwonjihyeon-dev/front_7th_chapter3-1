import { cn } from "@/lib/utils";
import React from "react";
import { Input } from "./Input";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({ value, onChange, placeholder = "검색...", className }) => {
  return (
    <div className={cn("mb-4", className)}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-[300px] rounded-[4px] border border-[#ddd] px-3 py-2"
      />
    </div>
  );
};
