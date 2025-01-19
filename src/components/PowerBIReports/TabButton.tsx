import React from 'react';
import clsx from 'clsx';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-6 py-3 text-sm font-medium rounded-lg transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A1929]',
        active
          ? 'bg-blue-500 text-white'
          : 'text-blue-200 hover:text-white hover:bg-[#173A5E]'
      )}
    >
      {children}
    </button>
  );
}