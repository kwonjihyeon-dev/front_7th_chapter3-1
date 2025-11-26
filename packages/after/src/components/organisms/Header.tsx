import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-[1000] border-b border-[var(--color-gray-200)] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary-500)] text-xl font-bold text-white">
            L
          </div>
          <div>
            <h1 className="m-0 text-lg leading-none font-bold text-[var(--color-gray-900)]">Hanghae Company</h1>
            <p className="mt-0.5 text-xs leading-none text-[var(--color-gray-500)]">Design System Migration Project</p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-semibold text-[var(--color-gray-900)]">Demo User</div>
            <div className="text-xs text-[var(--color-gray-500)]">demo@example.com</div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-info-50)] text-base font-semibold text-[var(--color-primary-500)]">
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
