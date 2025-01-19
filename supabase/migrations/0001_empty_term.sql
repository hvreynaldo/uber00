/*
  # Create leases table

  1. New Tables
    - `leases`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `type` (text, not null)
      - `start_date` (date, not null)
      - `end_date` (date, not null)
      - `document_url` (text)
      - `status` (text, not null)
      - `user_id` (uuid, not null, references auth.users)
      - `created_at` (timestamptz, default: now())
      - `updated_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on `leases` table
    - Add policies for authenticated users to:
      - Read their own leases
      - Create new leases
      - Update their own leases
*/

CREATE TABLE IF NOT EXISTS leases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  document_url text,
  status text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leases ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own leases
CREATE POLICY "Users can read own leases"
  ON leases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own leases
CREATE POLICY "Users can insert own leases"
  ON leases
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own leases
CREATE POLICY "Users can update own leases"
  ON leases
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);