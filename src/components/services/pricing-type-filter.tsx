'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AIService } from '@/lib/api/services';

interface PricingTypeFilterProps {
  selectedPricingType: 'all' | 'freemium' | 'paid';
  onPricingTypeChange: (pricingType: 'all' | 'freemium' | 'paid') => void;
  services: AIService[];
}

// 가격 타입별 설명
const getPricingDescription = (type: string) => {
  const descriptions = {
    freemium: '기본 기능은 무료, 고급 기능은 유료인 서비스',
    paid: '유료 구독이 필요한 서비스',
  };

  return descriptions[type as keyof typeof descriptions] || '';
};

export function PricingTypeFilter({
  selectedPricingType,
  onPricingTypeChange,
  services,
}: PricingTypeFilterProps) {
  // 각 가격 타입별 서비스 수 계산
  const getPricingCount = (pricingType: 'all' | 'freemium' | 'paid') => {
    if (pricingType === 'all') return services.length;
    
    return services.filter((service) => {
      return service.pricing_type === pricingType;
    }).length;
  };

  const pricingTypes = [
    { 
      value: 'all' as const, 
      label: '전체', 
      description: null 
    },
    { 
      value: 'freemium' as const, 
      label: '프리미엄', 
      description: getPricingDescription('freemium')
    },
    { 
      value: 'paid' as const, 
      label: '유료', 
      description: getPricingDescription('paid')
    },
  ];

  return (
    <div className='flex flex-wrap items-center gap-2 mb-4'>
      <span className='text-sm font-medium text-gray-700 dark:text-gray-300 mr-2'>
        가격 유형:
      </span>
      
      <TooltipProvider>
        {pricingTypes.map((type) => {
          const count = getPricingCount(type.value);
          const isSelected = selectedPricingType === type.value;

          return (
            <div key={type.value} className='flex items-center gap-1'>
              <Button
                variant={isSelected ? 'default' : 'outline'}
                size='sm'
                onClick={() => onPricingTypeChange(type.value)}
                className='h-8'
              >
                {type.label}
                <Badge 
                  variant='secondary' 
                  className={`ml-2 h-5 ${
                    isSelected 
                      ? 'bg-white/20 text-white border-white/30' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {count}
                </Badge>
              </Button>
              
              {type.description && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle
                      size={14}
                      className='text-gray-400 hover:text-gray-600 cursor-help'
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='max-w-xs'>{type.description}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          );
        })}
      </TooltipProvider>
    </div>
  );
}