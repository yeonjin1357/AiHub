import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className='text-center'>
      <Link href='/' className='inline-flex items-center space-x-2 mb-6'>
        <div className='p-2 bg-blue-600 rounded-lg'>
          <Sparkles className='h-6 w-6 text-white' />
        </div>
        <span className='text-xl font-bold text-gray-900 dark:text-white'>
          AIMOA
        </span>
      </Link>
      
      <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {title}
      </h2>
      <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
        {subtitle}
      </p>
    </div>
  );
}