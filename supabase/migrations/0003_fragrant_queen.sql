/*
  # Storage setup for lease documents

  1. Storage Configuration
    - Create bucket configuration for lease documents
    - Set file size limit to 10MB
    - Restrict to PDF files only
  
  2. Security
    - Enable RLS policies for secure access
    - Allow authenticated users to upload their own documents
    - Allow users to read their own documents
    - Allow public read access to all documents
*/

-- Create bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'lease-documents',
  'lease-documents',
  true,
  10485760,  -- 10MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE
SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to upload files
CREATE POLICY "Users can upload lease documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'lease-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow users to read their own documents
CREATE POLICY "Users can read own documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'lease-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow public read access to all documents
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'lease-documents');