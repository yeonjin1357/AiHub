'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Code,
  Image,
  MessageSquare,
  Mic,
  Play,
  BarChart,
  Grid,
  Filter,
} from 'lucide-react';
import { AIService, Category } from '@/lib/api/services';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  services: AIService[];
}

// 카테고리 아이콘 매핑
const getCategoryIcon = (slug: string) => {
  const iconMap = {
    'text-generation': MessageSquare,
    'image-generation': Image,
    'coding-tools': Code,
    'voice-processing': Mic,
    'video-editing': Play,
    'data-analysis': BarChart,
  };

  return iconMap[slug as keyof typeof iconMap] || Grid;
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  services,
}: CategoryFilterProps) {
  // 각 카테고리별 서비스 수 계산
  const getServiceCount = (categoryId: string) => {
    return services.filter((service) => service.category_id === categoryId)
      .length;
  };

  const getFreeServiceCount = (categoryId: string) => {
    return services.filter(
      (service) => service.category_id === categoryId && service.is_free
    ).length;
  };

  return (
    <Card className='sticky top-16'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <Filter size={20} className='text-gray-500' />
          <h3 className='font-semibold text-gray-900 dark:text-white'>
            카테고리
          </h3>
        </div>
      </CardHeader>

      <CardContent className='space-y-2'>
        {/* 전체 카테고리 */}
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'ghost'}
          className='w-full justify-start h-auto py-3'
          onClick={() => onCategoryChange('all')}
        >
          <div className='flex items-center gap-3 w-full'>
            <Grid
              size={20}
              className={
                selectedCategory === 'all' ? 'text-white' : 'text-gray-500'
              }
            />
            <div className='flex-1 text-left'>
              <div className='font-medium'>전체 서비스</div>
              <div
                className={`text-sm ${
                  selectedCategory === 'all' ? 'text-white/80' : 'text-gray-500'
                }`}
              >
                {services.length}개 서비스
              </div>
            </div>
            <Badge variant='secondary'>
              {services.filter((s) => s.is_free).length}개 무료
            </Badge>
          </div>
        </Button>

        {/* 개별 카테고리 */}
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.slug);
          const serviceCount = getServiceCount(category.id);
          const freeCount = getFreeServiceCount(category.id);

          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'ghost'}
              className='w-full justify-start h-auto py-3'
              onClick={() => onCategoryChange(category.id)}
            >
              <div className='flex items-center gap-3 w-full'>
                <Icon
                  size={20}
                  className={
                    selectedCategory === category.id
                      ? 'text-white'
                      : 'text-gray-500'
                  }
                />
                <div className='flex-1 text-left'>
                  <div className='font-medium'>{category.name}</div>
                  <div
                    className={`text-sm ${
                      selectedCategory === category.id
                        ? 'text-white/80'
                        : 'text-gray-500'
                    }`}
                  >
                    {serviceCount}개 서비스
                  </div>
                </div>
                {freeCount > 0 && (
                  <Badge variant='secondary'>{freeCount}개 무료</Badge>
                )}
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
