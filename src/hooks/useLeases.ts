import { useState, useEffect, useMemo } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';
import { Lease } from '../types/lease';
import { calculateLeaseStatus } from '../utils/leaseStatus';
import { parseISO } from 'date-fns';

type DbLease = Database['public']['Tables']['leases']['Row'];

export function useLeases(user: User | null) {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchLeases() {
      try {
        const { data, error } = await supabase
          .from('leases')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setLeases(
          (data as DbLease[]).map((lease) => ({
            id: lease.id,
            name: lease.name,
            type: lease.type,
            startDate: parseISO(lease.start_date),
            endDate: parseISO(lease.end_date),
            document: lease.document_url,
            description: lease.description
          }))
        );
      } catch (error) {
        console.error('Error fetching leases:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeases();
  }, [user]);

  const leasesWithStatus = useMemo(() => {
    return leases.map(lease => ({
      ...lease,
      status: calculateLeaseStatus(lease.endDate)
    }));
  }, [leases]);

  const stats = useMemo(() => ({
    active: leasesWithStatus.filter((l) => l.status === 'active').length,
    expiringSoon: leasesWithStatus.filter((l) => l.status === 'expiring_soon').length,
    expired: leasesWithStatus.filter((l) => l.status === 'expired').length,
  }), [leasesWithStatus]);

  const expiringLeases = useMemo(() => 
    leasesWithStatus.filter((l) => l.status === 'expiring_soon'),
    [leasesWithStatus]
  );

  return { leases: leasesWithStatus, loading, stats, expiringLeases };
}