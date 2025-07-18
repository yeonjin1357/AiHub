-- Service Links and Functions Tables Setup
-- Run this in Supabase SQL Editor

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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_service_links_service_id ON service_links(service_id);
CREATE INDEX IF NOT EXISTS idx_service_links_display_order ON service_links(display_order);

-- Enable RLS
ALTER TABLE service_links ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service links are viewable by everyone" ON service_links;
DROP POLICY IF EXISTS "Admins can insert service links" ON service_links;
DROP POLICY IF EXISTS "Admins can update service links" ON service_links;
DROP POLICY IF EXISTS "Admins can delete service links" ON service_links;

-- Create RLS policies
CREATE POLICY "Service links are viewable by everyone" ON service_links
  FOR SELECT USING (true);

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

-- Create or replace the update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS update_service_links_updated_at ON service_links;
CREATE TRIGGER update_service_links_updated_at BEFORE UPDATE ON service_links
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Create service_functions table
CREATE TABLE IF NOT EXISTS service_functions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES ai_services(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  icon_name VARCHAR(100) DEFAULT 'Zap',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_service_functions_service_id ON service_functions(service_id);
CREATE INDEX IF NOT EXISTS idx_service_functions_display_order ON service_functions(service_id, display_order);

-- Enable RLS
ALTER TABLE service_functions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Service functions are viewable by everyone" ON service_functions
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert service functions" ON service_functions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

CREATE POLICY "Admins can update service functions" ON service_functions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

CREATE POLICY "Admins can delete service functions" ON service_functions
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_service_functions_updated_at ON service_functions;
CREATE TRIGGER update_service_functions_updated_at BEFORE UPDATE ON service_functions
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Migrate existing features data from ai_services table
DO $$
DECLARE
  service_record RECORD;
  feature_item TEXT;
  feature_order INTEGER;
BEGIN
  -- Check if migration already done by checking if any records exist
  IF NOT EXISTS (SELECT 1 FROM service_functions LIMIT 1) THEN
    -- Loop through all services
    FOR service_record IN 
      SELECT id, features 
      FROM ai_services 
      WHERE features IS NOT NULL AND jsonb_array_length(features) > 0
    LOOP
      feature_order := 0;
      
      -- Loop through each feature in the features array
      FOR feature_item IN 
        SELECT jsonb_array_elements_text(service_record.features)
      LOOP
        -- Insert into service_functions table
        INSERT INTO service_functions (
          service_id, 
          name, 
          description,
          icon_name,
          display_order
        ) VALUES (
          service_record.id,
          feature_item,
          '이 기능을 통해 더욱 효율적인 작업이 가능합니다.',
          'Zap',
          feature_order
        ) ON CONFLICT DO NOTHING;
        
        feature_order := feature_order + 1;
      END LOOP;
    END LOOP;
  END IF;
END $$;