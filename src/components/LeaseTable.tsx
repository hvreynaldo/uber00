import React from 'react';
import { Lease } from '../types/lease';
import { TableHeader } from './LeaseTable/TableHeader';
import { LeaseRow } from './LeaseTable/LeaseRow';
import { MobileLeaseCard } from './LeaseTable/MobileLeaseCard';

interface LeaseTableProps {
  leases: Lease[];
  onLeaseClick: (lease: Lease) => void;
}

export function LeaseTable({ leases, onLeaseClick }: LeaseTableProps) {
  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {leases.map((lease) => (
          <MobileLeaseCard
            key={lease.id}
            lease={lease}
            onClick={onLeaseClick}
          />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto rounded-xl glass-effect">
        <table className="min-w-full divide-y divide-[#1E4976]">
          <TableHeader />
          <tbody className="divide-y divide-[#1E4976]">
            {leases.map((lease) => (
              <LeaseRow
                key={lease.id}
                lease={lease}
                onClick={onLeaseClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}