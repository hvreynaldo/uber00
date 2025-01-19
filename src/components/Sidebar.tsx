import React, { useState } from 'react';
import { Clock, X } from 'lucide-react';
import { Lease, LeaseStats } from '../types/lease';
import { format, differenceInDays } from 'date-fns';
import { EmailSettings } from './settings/EmailSettings';
import clsx from 'clsx';

interface SidebarProps {
  expiringLeases: Lease[];
  stats: LeaseStats;
  onViewDetails: (lease: Lease) => void;
}

export function Sidebar({ expiringLeases, stats, onViewDetails }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-50"
      >
        <Clock className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      <div
        className={clsx(
          'lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Content */}
      <div
        className={clsx(
          'fixed lg:static inset-y-0 right-0 w-80 bg-[#0A1929] border-l border-[#1E4976] p-6 overflow-y-auto transition-transform duration-300 transform z-50',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-blue-200 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Expiring Leases Panel */}
        <div className="mb-8 mt-8 lg:mt-0">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-white">
            <Clock className="w-5 h-5 mr-2 text-blue-400" />
            Expiring Leases
          </h2>
          <div className="space-y-4">
            {expiringLeases.map((lease) => {
              const daysUntilExpiry = differenceInDays(lease.endDate, new Date());
              const isUrgent = daysUntilExpiry <= 2;
              
              return (
                <div
                  key={lease.id}
                  className={clsx(
                    'p-4 rounded-lg glass-effect hover-effect',
                    isUrgent ? 'bg-rose-500/20 border-rose-500/30' : ''
                  )}
                >
                  <h3 className="font-medium text-white">{lease.name}</h3>
                  <p className="text-sm text-blue-200">
                    Expires: {format(lease.endDate, 'MMM d, yyyy')}
                  </p>
                  <p className="text-sm text-blue-200 mb-2">
                    {daysUntilExpiry} days remaining
                  </p>
                  <button
                    onClick={() => {
                      onViewDetails(lease);
                      setIsOpen(false);
                    }}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-white">Summary</h2>
          <div className="grid gap-4">
            <div className="glass-effect p-4 rounded-lg bg-emerald-500/20 border-emerald-500/30">
              <span className="text-emerald-300 font-medium">{stats.active}</span>
              <span className="text-emerald-200 ml-2">Active</span>
            </div>
            <div className="glass-effect p-4 rounded-lg bg-amber-500/20 border-amber-500/30">
              <span className="text-amber-300 font-medium">{stats.expiringSoon}</span>
              <span className="text-amber-200 ml-2">Expiring Soon</span>
            </div>
            <div className="glass-effect p-4 rounded-lg bg-rose-500/20 border-rose-500/30">
              <span className="text-rose-300 font-medium">{stats.expired}</span>
              <span className="text-rose-200 ml-2">Expired</span>
            </div>
          </div>
        </div>

        {/* Email Settings Section */}
        <EmailSettings />
      </div>
    </>
  );
}