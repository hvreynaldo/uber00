import React from 'react';
import { Header } from './components/Header';
import { LeaseUpload } from './components/LeaseUpload';
import { LeaseTable } from './components/LeaseTable';
import { Sidebar } from './components/Sidebar';
import { LoginForm } from './components/auth/LoginForm';
import { useAuth } from './hooks/useAuth';
import { useLeases } from './hooks/useLeases';
import { Chatbot } from './components/Chatbot';
import { PowerBIReports } from './components/PowerBIReports/PowerBIReports';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const { leases, loading, stats, expiringLeases } = useLeases(user);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1929]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const handleLeaseClick = (lease) => {
    console.log('Clicked lease:', lease);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1929]">
        <div className="text-lg">Loading leases...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1929]">
      <Header />
      
      <div className="flex">
        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid gap-8">
              <PowerBIReports />
              
              <div className="grid lg:grid-cols-2 gap-8">
                <LeaseUpload onFileSelect={() => {}} />
                <div className="glass-effect rounded-lg p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass-effect p-4 rounded-lg bg-emerald-500/20 border-emerald-500/30">
                      <span className="text-2xl font-bold text-emerald-300">{stats.active}</span>
                      <span className="block text-emerald-200 text-sm">Active Leases</span>
                    </div>
                    <div className="glass-effect p-4 rounded-lg bg-amber-500/20 border-amber-500/30">
                      <span className="text-2xl font-bold text-amber-300">{stats.expiringSoon}</span>
                      <span className="block text-amber-200 text-sm">Expiring Soon</span>
                    </div>
                    <div className="glass-effect p-4 rounded-lg bg-rose-500/20 border-rose-500/30">
                      <span className="text-2xl font-bold text-rose-300">{stats.expired}</span>
                      <span className="block text-rose-200 text-sm">Expired</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <LeaseTable 
                leases={leases}
                onLeaseClick={handleLeaseClick}
              />
            </div>
          </div>
        </main>
        
        <Sidebar
          expiringLeases={expiringLeases}
          stats={stats}
          onViewDetails={handleLeaseClick}
        />
      </div>

      <Chatbot />
    </div>
  );
}