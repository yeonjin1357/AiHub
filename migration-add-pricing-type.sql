-- Migration: Add pricing_type column to ai_services table
-- This migration adds a new column to categorize services as 'free', 'freemium', or 'paid'

-- Add the pricing_type column
ALTER TABLE ai_services 
ADD COLUMN pricing_type VARCHAR(20) CHECK (pricing_type IN ('free', 'freemium', 'paid'));

-- Update existing data based on current is_free and pricing_info
-- Set pricing_type for existing records
UPDATE ai_services 
SET pricing_type = CASE 
  WHEN is_free = true THEN 'free'
  WHEN is_free = false AND pricing_info::text LIKE '%free_tier%' THEN 'freemium'
  ELSE 'paid'
END;

-- Add index for better query performance
CREATE INDEX idx_ai_services_pricing_type ON ai_services(pricing_type);

-- Add comment to document the column
COMMENT ON COLUMN ai_services.pricing_type IS 'Categorizes service pricing: free (completely free), freemium (free tier + paid plans), paid (paid only)';

-- Update the database schema documentation
-- Note: You may want to keep is_free for backwards compatibility initially