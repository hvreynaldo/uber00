import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { Lease } from '../../types/lease';
import { calculateLeaseStatus } from '../../utils/leaseStatus';
import { StatusBadge } from './StatusBadge';

interface LeaseRowProps {
  lease: Lease;
  onClick: (lease: Lease) => void;
}

export function LeaseRow({ lease, onClick }: LeaseRowProps) {
  const daysUntilExpiry = differenceInDays(lease.endDate, new Date());
  const status = calculateLeaseStatus(lease.endDate);
  
  return (
    <tr onClick={() => onClick(lease)} className="table-row-hover">
      <td className="px-4 py-4">
        <div className="text-sm font-medium text-white">{lease.name}</div>
        <div className="text-xs text-blue-200/80">{lease.id}</div>
      </td>
      <td className="px-4 py-4 text-sm text-white">
        {lease.type}
      </td>
      <td className="px-4 py-4 text-sm text-white">
        {lease.description}
      </td>
      <td className="px-4 py-4 text-sm text-white">
        {format(lease.startDate, 'yyyy-MM-dd')}
      </td>
      <td className="px-4 py-4 text-sm text-white">
        {format(lease.endDate, 'yyyy-MM-dd')}
      </td>
      <td className="px-4 py-4 text-sm text-white">
        {daysUntilExpiry}
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={status} />
      </td>
      <td className="px-4 py-4">
        {lease.document && (
          <a
            href={lease.document}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </td>
    </tr>
  );
}