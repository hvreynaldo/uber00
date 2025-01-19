import React, { useState } from 'react';
import { isValidTime } from '../../utils/timeValidation';

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TimeInput({ value, onChange, disabled }: TimeInputProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue && !isValidTime(newValue)) {
      setError('Please enter a valid time (e.g., 8:00 AM or 15:30)');
    } else {
      setError(null);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-blue-200">
        Email Time
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Enter time (e.g., 8:00 AM or 15:30)"
        className="w-full px-3 py-2 bg-[#132F4C] border border-[#1E4976] rounded-lg
                 text-white placeholder-blue-200/50 focus:border-blue-400
                 focus:ring-1 focus:ring-blue-400 disabled:opacity-50
                 disabled:cursor-not-allowed"
      />
      {error && (
        <p className="text-xs text-rose-300">{error}</p>
      )}
    </div>
  );
}