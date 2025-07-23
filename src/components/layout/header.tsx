'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, User, LogOut, X, Heart, Shield, Sparkles } from 'lucide-react';
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
    <header className='sticky top-0 z-50 w-full glass border-b border-white/10'>
      <div className='flex px-4 sm:px-6 lg:px-8 w-full h-16 items-center'>
        <div className='mr-4 hidden md:flex'>
          <a className='mr-8 flex items-center space-x-2' href='/'>
            <div className='relative'>
              <Sparkles className='h-6 w-6 text-blue-500 glow-text' />
              <div className='absolute inset-0 h-6 w-6 bg-blue-500 blur-xl opacity-50'></div>
            </div>
            <span className='font-bold text-xl gradient-text'>
              AIMOA
            </span>
          </a>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            <Link href='/services'>
              <span className='transition-all text-zinc-400 hover:text-white hover:glow-text'>
                서비스
              </span>
            </Link>

            <span 
              className='transition-all text-zinc-400 hover:text-white hover:glow-text cursor-pointer'
              onClick={handleCommunityClick}
            >
              커뮤니티
            </span>

            <Link href='/contact'>
              <span className='transition-all text-zinc-400 hover:text-white hover:glow-text'>
                문의
              </span>
            </Link>
          </nav>
        </div>
        
        <button 
          className='inline-flex items-center justify-center rounded-md font-medium transition-colors text-zinc-400 hover:text-white h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          <span className='sr-only'>Toggle Menu</span>
        </button>
        
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            <SearchBar />
          </div>
          <nav className='hidden md:flex items-center space-x-3'>
            {loading ? (
              <div className='h-9 w-20 bg-zinc-800 rounded animate-pulse' />
            ) : user ? (
              <>
                <Button 
                  variant='ghost' 
                  size='sm' 
                  asChild
                  className='text-zinc-400 hover:text-white hover:bg-white/10 border-0'
                >
                  <Link href='/favorites'>
                    <Heart className='mr-2 h-4 w-4' />
                    찜 목록
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant='ghost' 
                      size='sm'
                      className='text-zinc-400 hover:text-white hover:bg-white/10 border-0'
                    >
                      <User className='mr-2 h-4 w-4' />
                      <span className="max-w-[100px] truncate">
                        {userProfile?.name || user.user_metadata?.name || user.email?.split('@')[0] || '사용자'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align='end' 
                    className='w-56 glass-light border-white/10 shadow-xl'
                  >
                    <DropdownMenuLabel className='text-zinc-300'>내 계정</DropdownMenuLabel>
                    <DropdownMenuSeparator className='bg-white/10' />
                    {userProfile?.role === 'ADMIN' && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href='/admin' className='cursor-pointer text-zinc-400 hover:text-white focus:text-white'>
                            <Shield className='mr-2 h-4 w-4' />
                            관리자 대시보드
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className='bg-white/10' />
                      </>
                    )}
                    <DropdownMenuItem 
                      onClick={signOut} 
                      className='cursor-pointer text-zinc-400 hover:text-white focus:text-white'
                    >
                      <LogOut className='mr-2 h-4 w-4' />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant='ghost' 
                  size='sm' 
                  asChild
                  className='text-zinc-400 hover:text-white hover:bg-white/10 border-0'
                >
                  <Link href='/signin'>로그인</Link>
                </Button>
                <Button 
                  size='sm' 
                  asChild
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 btn-glow'
                >
                  <Link href='/signup'>회원가입</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className='md:hidden border-t border-white/10 glass'>
          <div className='px-4 py-4 space-y-4'>
            <nav className='flex flex-col space-y-3'>
              <Link 
                href='/services'
                className='text-zinc-400 hover:text-white transition-colors py-2'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                서비스
              </Link>
              <span 
                className='text-zinc-400 hover:text-white transition-colors py-2 cursor-pointer'
                onClick={handleCommunityClick}
              >
                커뮤니티
              </span>
              <Link 
                href='/contact'
                className='text-zinc-400 hover:text-white transition-colors py-2'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                문의
              </Link>
            </nav>
            
            <div className='pt-4 border-t border-white/10'>
              {loading ? (
                <div className='h-9 w-20 bg-zinc-800 rounded animate-pulse' />
              ) : user ? (
                <div className='flex flex-col space-y-2'>
                  <Button 
                    variant='ghost' 
                    size='sm' 
                    asChild 
                    className='justify-start text-zinc-400 hover:text-white hover:bg-white/10'
                  >
                    <Link href='/favorites' onClick={() => setIsMobileMenuOpen(false)}>
                      <Heart className='mr-2 h-4 w-4' />
                      찜 목록
                    </Link>
                  </Button>
                  {userProfile?.role === 'ADMIN' && (
                    <Button 
                      variant='ghost' 
                      size='sm' 
                      asChild 
                      className='justify-start text-zinc-400 hover:text-white hover:bg-white/10'
                    >
                      <Link href='/admin' onClick={() => setIsMobileMenuOpen(false)}>
                        <Shield className='mr-2 h-4 w-4' />
                        관리자 대시보드
                      </Link>
                    </Button>
                  )}
                  <Button 
                    variant='ghost' 
                    size='sm' 
                    className='justify-start text-zinc-400 hover:text-white hover:bg-white/10'
                  >
                    <User className='mr-2 h-4 w-4' />
                    {user.user_metadata?.name || userProfile?.name || '사용자'}
                  </Button>
                  <Button 
                    variant='ghost' 
                    size='sm' 
                    onClick={signOut} 
                    className='justify-start text-zinc-400 hover:text-white hover:bg-white/10'
                  >
                    <LogOut className='mr-2 h-4 w-4' />
                    로그아웃
                  </Button>
                </div>
              ) : (
                <div className='flex flex-col space-y-2'>
                  <Button 
                    variant='ghost' 
                    size='sm' 
                    asChild 
                    className='justify-start text-zinc-400 hover:text-white hover:bg-white/10'
                  >
                    <Link href='/signin' onClick={() => setIsMobileMenuOpen(false)}>로그인</Link>
                  </Button>
                  <Button 
                    size='sm' 
                    asChild 
                    className='justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0'
                  >
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