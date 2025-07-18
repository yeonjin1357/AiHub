import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <Search size={64} className='mx-auto text-gray-300 mb-4' />
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            서비스를 찾을 수 없습니다
          </h1>
          <p className='text-gray-600 mb-8 max-w-md'>
            요청하신 AI 서비스가 존재하지 않거나 삭제되었을 수 있습니다.
          </p>
          <div className='space-x-4'>
            <Button asChild>
              <Link href='/services'>
                모든 서비스 보기
              </Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='/'>
                홈으로 돌아가기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}