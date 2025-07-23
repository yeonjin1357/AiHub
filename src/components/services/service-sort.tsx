'use client';

import { ArrowUpDown, Star, DollarSign, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ServiceSortProps {
  value: 'name' | 'featured' | 'freemium';
  onChange: (value: 'name' | 'featured' | 'freemium') => void;
}

export function ServiceSort({ value, onChange }: ServiceSortProps) {
  const sortOptions = [
    {
      value: 'featured' as const,
      label: '추천순',
      icon: Star,
      description: '추천 서비스를 먼저 표시',
    },
    {
      value: 'freemium' as const,
      label: '프리미엄순',
      icon: DollarSign,
      description: '프리미엄 서비스를 먼저 표시',
    },
    {
      value: 'name' as const,
      label: '이름순',
      icon: SortAsc,
      description: '서비스명 알파벳 순',
    },
  ];

  const currentOption = sortOptions.find((option) => option.value === value);
  const CurrentIcon = currentOption?.icon || ArrowUpDown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
        >
          <CurrentIcon size={16} />
          {currentOption?.label || '정렬'}
          <ArrowUpDown size={14} className='opacity-50' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-56 glass border-white/10 shadow-xl'
      >
        {sortOptions.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`flex items-center gap-3 text-zinc-400 hover:text-white focus:text-white ${
                value === option.value ? 'bg-white/10 text-white' : ''
              }`}
            >
              <Icon
                size={16}
                className={
                  value === option.value ? 'text-blue-400' : 'text-zinc-500'
                }
              />
              <div className='flex-1'>
                <div className='font-medium'>{option.label}</div>
                <div className='text-sm text-zinc-500'>
                  {option.description}
                </div>
              </div>
              {value === option.value && (
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
