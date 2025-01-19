import React from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

interface FloatingActionButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

export function FloatingActionButton({ onClick, label, className }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'fixed bottom-4 right-4 md:bottom-8 md:right-8',
        'p-4 rounded-full shadow-lg',
        'bg-blue-500 text-white',
        'hover:bg-blue-600 active:bg-blue-700',
        'transform transition-all duration-200',
        'hover:scale-105 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A1929]',
        className
      )}
      aria-label={label}
    >
      <Plus className="h-6 w-6" />
    </button>
  );
}