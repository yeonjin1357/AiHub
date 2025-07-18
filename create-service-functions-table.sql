-- Service Functions 테이블 생성 스크립트
-- Supabase SQL Editor에서 이 스크립트를 실행하세요

-- 1. service_functions 테이블 생성
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

-- 2. 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_service_functions_service_id ON service_functions(service_id);
CREATE INDEX IF NOT EXISTS idx_service_functions_display_order ON service_functions(service_id, display_order);

-- 3. RLS (Row Level Security) 활성화
ALTER TABLE service_functions ENABLE ROW LEVEL SECURITY;

-- 4. RLS 정책 생성
-- 모든 사용자가 읽기 가능
CREATE POLICY "Service functions are viewable by everyone" ON service_functions
  FOR SELECT USING (true);

-- 관리자만 추가 가능
CREATE POLICY "Admins can insert service functions" ON service_functions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

-- 관리자만 수정 가능
CREATE POLICY "Admins can update service functions" ON service_functions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

-- 관리자만 삭제 가능
CREATE POLICY "Admins can delete service functions" ON service_functions
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

-- 5. updated_at 자동 업데이트 트리거 생성
-- 트리거 함수가 없다면 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
CREATE TRIGGER update_service_functions_updated_at
  BEFORE UPDATE ON service_functions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 6. 기존 features 데이터 마이그레이션 (선택사항)
-- ai_services 테이블의 features 컬럼에서 데이터를 가져옵니다
DO $$
DECLARE
  service_record RECORD;
  feature_item TEXT;
  feature_order INTEGER;
BEGIN
  -- 이미 데이터가 있는지 확인
  IF NOT EXISTS (SELECT 1 FROM service_functions LIMIT 1) THEN
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
          '이 기능을 통해 더욱 효율적인 작업이 가능합니다.',
          'Zap',
          feature_order
        );
        
        feature_order := feature_order + 1;
      END LOOP;
    END LOOP;
    
    RAISE NOTICE '기존 features 데이터 마이그레이션 완료';
  ELSE
    RAISE NOTICE 'service_functions 테이블에 이미 데이터가 있습니다. 마이그레이션을 건너뜁니다.';
  END IF;
END $$;

-- 7. 테이블 생성 확인
SELECT COUNT(*) as total_functions FROM service_functions;