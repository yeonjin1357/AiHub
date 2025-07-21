'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import * as Icons from 'lucide-react';

interface ServiceFunction {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  display_order: number;
}

interface ServiceFunctionsDisplayProps {
  serviceId: string;
}

export function ServiceFunctionsDisplay({ serviceId }: ServiceFunctionsDisplayProps) {
  const [functions, setFunctions] = useState<ServiceFunction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    // 이미 데이터를 가져왔으면 다시 가져오지 않음
    if (hasFetched) return;

    const loadFunctions = async () => {
      try {
        const response = await fetch(`/api/services/${serviceId}/functions`);
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          
          // 테이블이 없는 경우에도 정상적으로 처리
          if (response.status === 200) {
            setFunctions([]);
          }
          return;
        }
        
        const data = await response.json();
        console.log('Loaded functions for display:', data);
        setFunctions(data);
        setHasFetched(true);
      } catch (error) {
        console.error('Error loading service functions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFunctions();
  }, [serviceId, hasFetched]);

  // 아이콘 컴포넌트 가져오기
  const getIconComponent = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.Zap;
    return Icon;
  };

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-gray-200 rounded-xl mb-4 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (functions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">이 서비스의 기능 정보가 준비 중입니다.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {functions.map((func) => {
        const FeatureIcon = getIconComponent(func.icon_name);
        return (
          <Card
            key={func.id}
            className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group bg-white"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center border border-blue-200 group-hover:scale-110 transition-transform">
                  <FeatureIcon
                    size={20}
                    className="text-blue-600"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {func.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {func.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}