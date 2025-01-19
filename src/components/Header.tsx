import React, { useState } from 'react';
import { TruckIcon, UserCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import clsx from 'clsx';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <header className="sticky top-0 z-[100] bg-[#0A1929]/95 backdrop-blur-lg border-b border-[#1E4976] px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <TruckIcon className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">Uber Freight Lease Tracker</h1>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
          >
            <UserCircle className="h-8 w-8" />
          </button>
          
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-[101]"
                onClick={() => setIsOpen(false)}
              />
              <div className={clsx(
                "absolute right-0 top-full mt-1 w-48 rounded-lg py-1",
                "glass-effect divide-y divide-[#1E4976]",
                "z-[102]"
              )}>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-blue-200 hover:text-white hover:bg-[#173A5E] transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}