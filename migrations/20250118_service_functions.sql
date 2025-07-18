-- 서비스 기능 관리 시스템을 위한 마이그레이션

-- service_functions 테이블 생성
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

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_service_functions_service_id ON service_functions(service_id);
CREATE INDEX IF NOT EXISTS idx_service_functions_display_order ON service_functions(service_id, display_order);

-- RLS 정책 설정
ALTER TABLE service_functions ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능
CREATE POLICY "service_functions_read_policy" ON service_functions
  FOR SELECT USING (true);

-- 관리자만 수정 가능
CREATE POLICY "service_functions_write_policy" ON service_functions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

-- 업데이트 시간 자동 갱신을 위한 트리거 (이미 있는 함수 재사용)
CREATE TRIGGER update_service_functions_updated_at
  BEFORE UPDATE ON service_functions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 기존 features 데이터를 service_functions로 마이그레이션하는 함수
CREATE OR REPLACE FUNCTION migrate_features_to_service_functions()
RETURNS void AS $$
DECLARE
  service_record RECORD;
  feature_item TEXT;
  feature_order INTEGER;
BEGIN
  -- 모든 서비스를 순회
  FOR service_record IN 
    SELECT id, features 
    FROM ai_services 
    WHERE features IS NOT NULL AND jsonb_array_length(features) > 0
  LOOP
    feature_order := 0;
    
    -- 각 서비스의 features 배열을 순회
    FOR feature_item IN 
      SELECT jsonb_array_elements_text(service_record.features)
    LOOP
      -- service_functions 테이블에 삽입
      INSERT INTO service_functions (
        service_id, 
        name, 
        description,
        icon_name,
        display_order
      ) VALUES (
        service_record.id,
        feature_item,
        '이 기능을 통해 더욱 효율적인 작업이 가능합니다.', -- 기본 설명
        'Zap', -- 기본 아이콘
        feature_order
      ) ON CONFLICT DO NOTHING;
      
      feature_order := feature_order + 1;
    END LOOP;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 마이그레이션 실행
SELECT migrate_features_to_service_functions();

-- 함수 삭제 (더 이상 필요없음)
DROP FUNCTION IF EXISTS migrate_features_to_service_functions();