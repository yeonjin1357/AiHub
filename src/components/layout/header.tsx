'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, User, LogOut, X, Heart, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { SearchBar } from './search-bar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user, userProfile, loading, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCommunityClick = () => {
    toast.info('커뮤니티 기능이 준비 중입니다. 곧 만나보실 수 있어요! 🚀');
  };

  return (
    <header className='sticky top-0 z-50 w-full shadow-sm bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
      <div className='flex px-4 w-full h-16 items-center'>
        <div className='mr-4 hidden md:flex'>
          <a className='mr-6 flex items-center space-x-2' href='/'>
            <span className='hidden font-bold text-xl sm:inline-block'>
              AIMOA
            </span>
          </a>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            <Link href='/services'>
              <span className='transition-colors text-gray-600 hover:text-gray-900'>
                서비스
              </span>
            </Link>

            <span 
              className='transition-colors text-gray-600 hover:text-gray-900 cursor-pointer'
              onClick={handleCommunityClick}
            >
              커뮤니티
            </span>

            <Link href='/contact'>
              <span className='transition-colors text-gray-600 hover:text-gray-900'>
                문의
              </span>
            </Link>
          </nav>
        </div>
        <button 
          className='inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 h-9 py-2 mr-2 px-0 text-base hover:text-gray-900 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          <span className='sr-only'>Toggle Menu</span>
        </button>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            <SearchBar />
          </div>
          <nav className='hidden md:flex items-center space-x-2'>
            <ThemeToggle />
            {loading ? (
              <div className='h-9 w-20 bg-gray-200 rounded animate-pulse' />
            ) : user ? (
              <>
                <Button variant='ghost' size='sm' asChild>
                  <Link href='/favorites'>
                    <Heart className='mr-2 h-4 w-4' />
                    찜 목록
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm'>
                      <User className='mr-2 h-4 w-4' />
                      {user.user_metadata?.name || userProfile?.name || '사용자'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-56 bg-white border-gray-100 shadow-lg'>
                    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                    <DropdownMenuSeparator className='bg-gray-100' />
                    {userProfile?.role === 'ADMIN' && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href='/admin' className='cursor-pointer'>
                            <Shield className='mr-2 h-4 w-4' />
                            관리자 대시보드
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className='bg-gray-100' />
                      </>
                    )}
                    <DropdownMenuItem onClick={signOut} className='cursor-pointer'>
                      <LogOut className='mr-2 h-4 w-4' />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
        <div className='md:hidden border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
          <div className='px-4 py-4 space-y-4'>
            <nav className='flex flex-col space-y-3'>
              <Link 
                href='/services'
                className='text-gray-700 hover:text-gray-900 transition-colors py-2'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                서비스
              </Link>
              <span 
                className='text-gray-700 hover:text-gray-900 transition-colors py-2 cursor-pointer'
                onClick={handleCommunityClick}
              >
                커뮤니티
              </span>
              <Link 
                href='/contact'
                className='text-gray-700 hover:text-gray-900 transition-colors py-2'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                문의
              </Link>
            </nav>
            
            <div className='pt-4 border-t border-gray-200'>
              <div className='flex items-center justify-between mb-4'>
                <span className='text-sm font-medium'>테마 설정</span>
                <ThemeToggle />
              </div>
              {loading ? (
                <div className='h-9 w-20 bg-gray-200 rounded animate-pulse' />
              ) : user ? (
                <div className='flex flex-col space-y-2'>
                  <Button variant='ghost' size='sm' asChild className='justify-start'>
                    <Link href='/favorites' onClick={() => setIsMobileMenuOpen(false)}>
                      <Heart className='mr-2 h-4 w-4' />
                      찜 목록
                    </Link>
                  </Button>
                  {userProfile?.role === 'ADMIN' && (
                    <Button variant='ghost' size='sm' asChild className='justify-start'>
                      <Link href='/admin' onClick={() => setIsMobileMenuOpen(false)}>
                        <Shield className='mr-2 h-4 w-4' />
                        관리자 대시보드
                      </Link>
                    </Button>
                  )}
                  <Button variant='ghost' size='sm' className='justify-start'>
                    <User className='mr-2 h-4 w-4' />
                    {user.user_metadata?.name || userProfile?.name || '사용자'}
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
