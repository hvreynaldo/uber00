import React from 'react';

interface ReportOptionsProps {
  value: {
    expiringSoon: boolean;
    summary: boolean;
    recentlyExpired: boolean;
    fullList: boolean;
  };
  onChange: (value: ReportOptionsProps['value']) => void;
  disabled?: boolean;
}

export function ReportOptions({ value, onChange, disabled }: ReportOptionsProps) {
  const handleChange = (key: keyof typeof value) => {
    if (disabled) return;
    onChange({ ...value, [key]: !value[key] });
  };

  const options = [
    {
      id: 'expiringSoon',
      label: 'Expiring Soon Leases',
      description: 'Leases expiring in the next 15 days'
    },
    {
      id: 'summary',
      label: 'Summary Statistics',
      description: 'Overview of Active, Expiring Soon, and Expired leases'
    },
    {
      id: 'recentlyExpired',
      label: 'Recently Expired Leases',
      description: 'Leases expired in the last 7 days'
    },
    {
      id: 'fullList',
      label: 'Full Lease List',
      description: 'A complete list of all leases with their statuses'
    }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-blue-200">
        Report Content
      </label>
      <div className="space-y-3">
        {options.map(({ id, label, description }) => (
          <label 
            key={id} 
            className={`flex items-start space-x-3 ${
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
          >
            <input
              type="checkbox"
              checked={value[id as keyof typeof value]}
              onChange={() => handleChange(id as keyof typeof value)}
              disabled={disabled}
              className="mt-1 rounded border-[#1E4976] bg-[#132F4C] 
                       text-blue-500 focus:ring-blue-500
                       disabled:opacity-50"
            />
            <div>
              <div className="text-sm text-white">{label}</div>
              <div className="text-xs text-blue-200/80">{description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}