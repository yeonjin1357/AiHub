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
      description: null,
    },
    {
      value: 'freemium' as const,
      label: '프리미엄',
      description: getPricingDescription('freemium'),
    },
    {
      value: 'paid' as const,
      label: '유료',
      description: getPricingDescription('paid'),
    },
  ];

  return (
    <div className='flex flex-wrap items-center gap-2 mb-4'>
      <span className='text-sm font-medium text-zinc-400 mr-2'>가격 유형:</span>

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
                className={`h-8 ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0'
                    : 'border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {type.label}
                <Badge
                  variant='outline'
                  className={`ml-2 h-5 ${
                    isSelected
                      ? 'bg-white/20 text-white border-white/30'
                      : 'bg-white/10 text-zinc-400 border-white/10'
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
                      className='text-zinc-500 hover:text-zinc-300 cursor-help'
                    />
                  </TooltipTrigger>
                  <TooltipContent className='glass border-white/10'>
                    <p className='max-w-xs text-white'>{type.description}</p>
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
