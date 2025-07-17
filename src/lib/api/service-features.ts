import { ServiceFeatureData, getCategoryDefaultFeatures, SERVICE_FEATURES } from '@/lib/service-features';

// 특징 키에 따른 카테고리 반환
function getFeatureCategory(featureKey: string): string {
  const feature = SERVICE_FEATURES[featureKey];
  return feature?.category || 'platform';
}

// 서비스 특징 조회 (API 라우트 사용)
export async function getServiceFeatures(serviceId: string): Promise<ServiceFeatureData[]> {
  if (!serviceId) {
    throw new Error('서비스 ID가 필요합니다.');
  }

  const response = await fetch(`/api/services/${serviceId}/features`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '서비스 특징을 불러오는데 실패했습니다.');
  }

  return await response.json();
}

// 서비스 특징 생성 (API 라우트 사용)
export async function createServiceFeature(feature: Omit<ServiceFeatureData, 'id'>): Promise<ServiceFeatureData | null> {
  try {
    const response = await fetch(`/api/services/${feature.service_id}/features`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feature)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error creating service feature:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating service feature:', error);
    return null;
  }
}

// 서비스에 카테고리 기본 특징 적용 (API 라우트 사용)
export async function applyDefaultFeaturesToService(
  serviceId: string,
  categorySlug: string
): Promise<boolean> {
  if (!serviceId || !categorySlug) {
    throw new Error('서비스 ID와 카테고리가 필요합니다.');
  }

  try {
    const response = await fetch(`/api/services/${serviceId}/features/apply-defaults`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categorySlug })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '기본 특징 적용에 실패했습니다.');
    }

    return true;
  } catch (error) {
    console.error('Error applying default features:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('기본 특징 적용 중 알 수 없는 오류가 발생했습니다.');
  }
}

// 서비스 특징 일괄 업데이트 (API 라우트 사용)
export async function bulkUpdateServiceFeatures(
  serviceId: string,
  features: Array<{
    id?: string;
    feature_key: string;
    custom_label?: string;
    custom_description?: string;
    is_highlighted: boolean;
    display_order: number;
    category: string;
  }>
): Promise<boolean> {
  try {
    const response = await fetch(`/api/services/${serviceId}/features`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ features })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error bulk updating service features:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in bulk update:', error);
    return false;
  }
}