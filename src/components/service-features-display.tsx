'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import { 
  DisplayServiceFeature, 
  convertToDisplayFeatures 
} from '@/lib/service-features';
import { getServiceFeatures } from '@/lib/api/service-features';

interface ServiceFeaturesDisplayProps {
  serviceId: string;
  className?: string;
}

export function ServiceFeaturesDisplay({ serviceId, className }: ServiceFeaturesDisplayProps) {
  const [features, setFeatures] = useState<DisplayServiceFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        const data = await getServiceFeatures(serviceId);
        const displayFeatures = convertToDisplayFeatures(data);
        setFeatures(displayFeatures);
      } catch (error) {
        console.error('Error loading service features:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatures();
  }, [serviceId]);

  if (isLoading) {
    return (
      <Card className={`${className} border-gray-200/60 dark:border-gray-700/60 shadow-sm`}>
        <CardHeader>
          <CardTitle>서비스 특징</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (features.length === 0) {
    return (
      <Card className={`${className} border-gray-200/60 dark:border-gray-700/60 shadow-sm`}>
        <CardHeader>
          <CardTitle>서비스 특징</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            등록된 특징이 없습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  // 하이라이트된 특징과 일반 특징 분리
  const highlightedFeatures = features.filter(feature => feature.isHighlighted);
  const regularFeatures = features.filter(feature => !feature.isHighlighted);

  // 표시할 특징 결정
  const visibleFeatures = showAll ? features : features.slice(0, 6);
  const hasMore = features.length > 6;

  return (
    <Card className={`${className} border-gray-200/60 dark:border-gray-700/60 shadow-sm`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>서비스 특징</span>
          {highlightedFeatures.length > 0 && (
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              주요 특징 {highlightedFeatures.length}개
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {visibleFeatures.map((feature, index) => (
            <div
              key={`${feature.key}-${index}`}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                feature.isHighlighted
                  ? 'bg-blue-50/50 border-blue-200/60 dark:bg-blue-900/10 dark:border-blue-800/40'
                  : 'bg-white/50 border-gray-200/60 dark:bg-gray-800/50 dark:border-gray-700/40 hover:bg-gray-50/80 dark:hover:bg-gray-700/60'
              } transition-colors`}
            >
              <feature.icon
                className={`h-5 w-5 mt-0.5 ${
                  feature.isHighlighted ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-900 dark:text-white">{feature.label}</span>
                  {feature.isHighlighted && (
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  )}
                  <Badge variant="outline" className="text-xs border-gray-300/50 dark:border-gray-600/50">
                    {getCategoryLabel(feature.category)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-4 text-center">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="ghost"
              size="sm"
              className="text-sm"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  간단히 보기
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  더 보기 ({features.length - 6}개)
                </>
              )}
            </Button>
          </div>
        )}

        {features.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex flex-wrap gap-2">
              {['platform', 'security', 'usage', 'pricing', 'integration', 'support'].map(category => {
                const categoryFeatures = features.filter(f => f.category === category);
                if (categoryFeatures.length === 0) return null;
                
                return (
                  <Badge key={category} variant="outline" className="text-xs border-gray-300/50 dark:border-gray-600/50 bg-gray-50/50 dark:bg-gray-800/50">
                    {getCategoryLabel(category)} ({categoryFeatures.length})
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 카테고리 라벨 변환 함수
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    platform: '플랫폼',
    security: '보안',
    usage: '사용 대상',
    pricing: '가격',
    integration: '연동',
    support: '지원'
  };
  return labels[category] || category;
}