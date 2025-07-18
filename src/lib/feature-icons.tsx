import { LucideIcon, Sparkles } from 'lucide-react';

// 기본 기능 데이터 (폴백용)
const defaultFeatureData = {
  icon: Sparkles,
  description: '이 기능을 통해 더욱 효율적인 작업이 가능합니다.',
};

// 기능명으로 아이콘과 설명을 가져오는 함수
// 이제 데이터베이스에서 관리하므로 이 함수는 폴백용으로만 사용됩니다
export function getFeatureData(featureName: string): {
  icon: LucideIcon;
  description: string;
} {
  // 데이터베이스에서 데이터를 가져오지 못했을 때의 폴백
  return defaultFeatureData;
}

// 기능명으로 아이콘만 가져오는 함수 (기존 호환성 유지)
export function getFeatureIcon(featureName: string): LucideIcon {
  return getFeatureData(featureName).icon;
}