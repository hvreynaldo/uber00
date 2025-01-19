import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { Lease } from '../../types/lease';
import { calculateLeaseStatus } from '../../utils/leaseStatus';
import { StatusBadge } from './StatusBadge';

interface MobileLeaseCardProps {
  lease: Lease;
  onClick: (lease: Lease) => void;
}

export function MobileLeaseCard({ lease, onClick }: MobileLeaseCardProps) {
  const daysUntilExpiry = differenceInDays(lease.endDate, new Date());
  const status = calculateLeaseStatus(lease.endDate);

  return (
    <div 
      onClick={() => onClick(lease)}
      className="glass-effect rounded-lg p-4 space-y-3 hover-effect"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-white">{lease.name}</h3>
          <p className="text-xs text-blue-200/80 mt-1">{lease.type}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-blue-200">
        <div>
          <p className="text-blue-200/60">Start Date</p>
          <p>{format(lease.startDate, 'yyyy-MM-dd')}</p>
        </div>
        <div>
          <p className="text-blue-200/60">End Date</p>
          <p>{format(lease.endDate, 'yyyy-MM-dd')}</p>
        </div>
        <div>
          <p className="text-blue-200/60">Days Left</p>
          <p>{daysUntilExpiry}</p>
        </div>
        <div>
          <p className="text-blue-200/60">Type</p>
          <p>{lease.type}</p>
        </div>
      </div>

      {lease.document && (
        <div className="flex justify-end pt-2">
          <a
            href={lease.document}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center space-x-1 text-xs"
          >
            <span>View Document</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}
    </div>
  );
}