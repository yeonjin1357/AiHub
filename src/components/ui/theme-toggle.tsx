'use client';

import { Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      disabled
    >
      <Moon className="h-5 w-5" />
      <span className="sr-only">Theme toggle (disabled)</span>
    </Button>
  );
}