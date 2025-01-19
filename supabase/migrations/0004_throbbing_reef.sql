/*
  # Update leases table structure
  
  1. Changes
    - Add description column
    - Remove status column and related constraints/triggers
    - Make description required with empty string default
*/

-- Remove status-related objects
DROP TRIGGER IF EXISTS update_lease_status ON leases;
DROP FUNCTION IF EXISTS calculate_lease_status();
ALTER TABLE leases DROP CONSTRAINT IF EXISTS valid_status;
ALTER TABLE leases DROP COLUMN IF EXISTS status;

-- Add description column
ALTER TABLE leases 
ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '';

-- Update existing rows to have empty description
UPDATE leases SET description = '' WHERE description IS NULL;