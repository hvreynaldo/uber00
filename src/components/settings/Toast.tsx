import React from 'react';
import { createRoot } from 'react-dom/client';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div className={clsx(
      'fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg',
      'flex items-center space-x-2',
      type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          'bg-rose-500/20 text-rose-300 border border-rose-500/30'
    )}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-black/20 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export const toast = {
  success(message: string) {
    this.show(message, 'success');
  },
  error(message: string) {
    this.show(message, 'error');
  },
  show(message: string, type: 'success' | 'error') {
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    const root = createRoot(container);
    const handleClose = () => {
      root.unmount();
      document.body.removeChild(container);
    };
    
    root.render(
      <Toast message={message} type={type} onClose={handleClose} />
    );
    
    setTimeout(handleClose, 3000);
  }
};