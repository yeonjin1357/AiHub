'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ServiceSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ServiceSearch({ 
  value, 
  onChange, 
  placeholder = "서비스를 검색하세요..." 
}: ServiceSearchProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-zinc-500" />
      </div>
      
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 bg-white/5 border-white/10 focus:border-blue-500/50 text-white placeholder:text-zinc-500 backdrop-blur-sm"
      />
      
      {value && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange('')}
            className="h-auto p-1 hover:bg-white/10 text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}