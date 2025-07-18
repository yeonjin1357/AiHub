-- Create service_links table
CREATE TABLE IF NOT EXISTS service_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES ai_services(id) ON DELETE CASCADE,
  label VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_service_links_service_id ON service_links(service_id);
CREATE INDEX idx_service_links_display_order ON service_links(display_order);

-- Add RLS policies
ALTER TABLE service_links ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Service links are viewable by everyone" ON service_links
  FOR SELECT USING (true);

-- Policy for admin write access
CREATE POLICY "Admins can insert service links" ON service_links
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

CREATE POLICY "Admins can update service links" ON service_links
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

CREATE POLICY "Admins can delete service links" ON service_links
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_service_links_updated_at BEFORE UPDATE ON service_links
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();