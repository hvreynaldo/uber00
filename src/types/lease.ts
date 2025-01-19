export type LeaseStatus = 'active' | 'expiring_soon' | 'expired';

export interface Lease {
  id: string;
  name: string;
  type: string;
  startDate: Date;
  endDate: Date;
  document?: string;
  description: string;
}

export interface LeaseStats {
  active: number;
  expiringSoon: number;
  expired: number;
}