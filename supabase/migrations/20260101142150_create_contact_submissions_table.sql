/*
  # Create Contact Form Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Name of the person submitting the form
      - `email` (text) - Email address of the person submitting
      - `message` (text) - The message content
      - `created_at` (timestamptz) - Timestamp of submission
      - `status` (text) - Status of the submission (new, read, archived)
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - No public access - only server-side access via edge functions
    - This ensures contact form data is kept private

  3. Notes
    - The table will be accessed only by edge functions using service role key
    - No RLS policies needed since only server will access this table
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- No policies needed - only edge functions with service role will access this table

-- Create index for faster queries on created_at
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at DESC);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx ON contact_submissions(status);