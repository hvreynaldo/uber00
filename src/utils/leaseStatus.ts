import { differenceInDays } from 'date-fns';

export function calculateLeaseStatus(endDate: Date): 'active' | 'expiring_soon' | 'expired' {
  const daysUntilExpiry = differenceInDays(endDate, new Date());
  
  if (daysUntilExpiry < 0) {
    return 'expired';
  } else if (daysUntilExpiry <= 7) {
    return 'expiring_soon';
  } else {
    return 'active';
  }
}