-- Drop service_features table and related objects

-- Drop RLS policies
DROP POLICY IF EXISTS "Public users can view service features" ON service_features;
DROP POLICY IF EXISTS "Admins can manage service features" ON service_features;

-- Drop indexes
DROP INDEX IF EXISTS idx_service_features_service_id;
DROP INDEX IF EXISTS idx_service_features_display_order;

-- Drop foreign key constraints and table
DROP TABLE IF EXISTS service_features CASCADE;

-- Also drop category_feature_templates table
DROP TABLE IF EXISTS category_feature_templates CASCADE;