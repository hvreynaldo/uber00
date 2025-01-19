import React from 'react';
import clsx from 'clsx';
import type { LeaseStatus } from '../../types/lease';

interface StatusBadgeProps {
  status: LeaseStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: LeaseStatus) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      case 'expiring_soon':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
      case 'expired':
        return 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300';
    }
  };

  return (
    <span className={clsx(
      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
      getStatusColor(status)
    )}>
      {status.replace('_', ' ').toUpperCase()}
    </span>
  );
}