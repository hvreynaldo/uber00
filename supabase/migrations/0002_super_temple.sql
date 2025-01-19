/*
  # Update lease statuses and add constraints

  1. Changes
    - Update existing lease statuses based on end_date
    - Add check constraint for valid status values
    - Add function and trigger for automatic status updates

  2. Security
    - No changes to RLS policies
*/

-- First, update existing records to have valid status values
DO $$ 
BEGIN
  UPDATE leases
  SET status = 
    CASE 
      WHEN end_date < CURRENT_DATE THEN 'expired'
      WHEN end_date <= CURRENT_DATE + INTERVAL '7 days' THEN 'expiring_soon'
      ELSE 'active'
    END;
END $$;

-- Now add the check constraint
ALTER TABLE leases 
  ADD CONSTRAINT valid_status 
  CHECK (status IN ('active', 'expiring_soon', 'expired'));

-- Create function to calculate lease status
CREATE OR REPLACE FUNCTION calculate_lease_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate days until expiry
  IF NEW.end_date IS NOT NULL THEN
    IF NEW.end_date < CURRENT_DATE THEN
      NEW.status := 'expired';
    ELSIF NEW.end_date <= CURRENT_DATE + INTERVAL '7 days' THEN
      NEW.status := 'expiring_soon';
    ELSE
      NEW.status := 'active';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update status
CREATE TRIGGER update_lease_status
  BEFORE INSERT OR UPDATE OF end_date
  ON leases
  FOR EACH ROW
  EXECUTE FUNCTION calculate_lease_status();