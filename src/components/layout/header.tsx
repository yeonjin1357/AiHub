'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, User, LogOut, X } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function Header() {
  const { user, loading, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex px-4 w-full h-16 items-center'>
        <div className='mr-4 hidden md:flex'>
          <a className='mr-6 flex items-center space-x-2' href='/'>
            <span className='hidden font-bold text-xl sm:inline-block'>
              AIMOA
            </span>
          </a>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            <Link href='/services'>
              <span className='transition-colors text-foreground/60 hover:text-foreground/80'>
                서비스
              </span>
            </Link>

            <span className='transition-colors text-foreground/60 hover:text-foreground/80'>
              커뮤니티
            </span>

            <Link href='/contact'>
              <span className='transition-colors text-foreground/60 hover:text-foreground/80'>
                문의
              </span>
            </Link>
          </nav>
        </div>
        <button 
          className='inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 py-2 mr-2 px-0 text-base hover:text-accent-foreground hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          <span className='sr-only'>Toggle Menu</span>
        </button>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <input
                placeholder='AI 서비스 검색...'
                className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-[200px] lg:w-[300px]'
              />
            </div>
          </div>
          <nav className='flex items-center space-x-2'>
            {loading ? (
              <div className='h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
            ) : user ? (
              <>
                <Button variant='ghost' size='sm'>
                  <User className='mr-2 h-4 w-4' />
                  {user.user_metadata?.name || '사용자'}
                </Button>
                <Button variant='ghost' size='sm' onClick={signOut}>
                  <LogOut className='mr-2 h-4 w-4' />
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button variant='ghost' size='sm' asChild>
                  <Link href='/signin'>로그인</Link>
                </Button>
                <Button size='sm' asChild>
                  <Link href='/signup'>회원가입</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className='md:hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <div className='px-4 py-4 space-y-4'>
            <nav className='flex flex-col space-y-3'>
              <Link 
                href='/services'
                className='text-foreground/80 hover:text-foreground transition-colors py-2'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                서비스
              </Link>
              <span className='text-foreground/80 hover:text-foreground transition-colors py-2'>
                커뮤니티
              </span>
              <Link 
                href='/contact'
                className='text-foreground/80 hover:text-foreground transition-colors py-2'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                문의
              </Link>
            </nav>
            
            <div className='pt-4 border-t border-border'>
              {loading ? (
                <div className='h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
              ) : user ? (
                <div className='flex flex-col space-y-2'>
                  <Button variant='ghost' size='sm' className='justify-start'>
                    <User className='mr-2 h-4 w-4' />
                    {user.user_metadata?.name || '사용자'}
                  </Button>
                  <Button variant='ghost' size='sm' onClick={signOut} className='justify-start'>
                    <LogOut className='mr-2 h-4 w-4' />
                    로그아웃
                  </Button>
                </div>
              ) : (
                <div className='flex flex-col space-y-2'>
                  <Button variant='ghost' size='sm' asChild className='justify-start'>
                    <Link href='/signin' onClick={() => setIsMobileMenuOpen(false)}>로그인</Link>
                  </Button>
                  <Button size='sm' asChild className='justify-start'>
                    <Link href='/signup' onClick={() => setIsMobileMenuOpen(false)}>회원가입</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
