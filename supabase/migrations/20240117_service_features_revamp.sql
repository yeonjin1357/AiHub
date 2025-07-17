-- 서비스 특징 시스템 개선을 위한 마이그레이션

-- 기존 service_features 테이블 삭제 (있다면)
DROP TABLE IF EXISTS service_features;

-- 새로운 service_features 테이블 생성
CREATE TABLE service_features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES ai_services(id) ON DELETE CASCADE,
  feature_key VARCHAR(100) NOT NULL,
  custom_label VARCHAR(200),
  custom_description TEXT,
  is_highlighted BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 추가
CREATE INDEX idx_service_features_service_id ON service_features(service_id);
CREATE INDEX idx_service_features_feature_key ON service_features(feature_key);
CREATE INDEX idx_service_features_category ON service_features(category);
CREATE INDEX idx_service_features_display_order ON service_features(service_id, display_order);

-- 카테고리별 기본 특징 템플릿 테이블 생성
CREATE TABLE category_feature_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  feature_key VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 추가
CREATE INDEX idx_category_feature_templates_category_id ON category_feature_templates(category_id);
CREATE UNIQUE INDEX idx_category_feature_templates_unique ON category_feature_templates(category_id, feature_key);

-- RLS 정책 설정
ALTER TABLE service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_feature_templates ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능
CREATE POLICY "service_features_read_policy" ON service_features
  FOR SELECT USING (true);

CREATE POLICY "category_feature_templates_read_policy" ON category_feature_templates
  FOR SELECT USING (true);

-- 인증된 사용자만 수정 가능 (관리자 권한 체크는 애플리케이션 레벨에서)
CREATE POLICY "service_features_write_policy" ON service_features
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "category_feature_templates_write_policy" ON category_feature_templates
  FOR ALL USING (auth.uid() IS NOT NULL);

-- 업데이트 시간 자동 갱신을 위한 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_service_features_updated_at
  BEFORE UPDATE ON service_features
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();