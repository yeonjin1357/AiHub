-- Create service_updates table for storing service news and updates

CREATE TABLE service_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES ai_services(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  link_url VARCHAR(500),
  source VARCHAR(100), -- 'official', 'youtube', 'blog', 'news' etc.
  source_name VARCHAR(100), -- e.g., 'OpenAI Blog', 'TechCrunch', 'YouTube'
  published_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_service_updates_service_id ON service_updates(service_id);
CREATE INDEX idx_service_updates_published_at ON service_updates(published_at DESC);

-- Enable RLS
ALTER TABLE service_updates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public users can view service updates
CREATE POLICY "Public users can view service updates" ON service_updates
  FOR SELECT USING (true);

-- Admins can manage service updates
CREATE POLICY "Admins can manage service updates" ON service_updates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );