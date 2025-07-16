'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Github, Mail } from 'lucide-react';
import { auth } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { translateAuthError } from '@/utils/auth-errors';
import { toast } from 'sonner';

const signInSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Attempting sign in with:', data.email);
      const { data: authData, error: authError } = await auth.signIn(
        data.email,
        data.password
      );

      if (authError) {
        console.error('Auth error:', authError);
        setError(translateAuthError(authError.message));
        return;
      }

      if (authData.user) {
        console.log('Sign in successful:', authData.user.id);
        toast.success('로그인되었습니다');
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError(
        `로그인 중 오류가 발생했습니다: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await auth.signInWithGoogle();
      if (error) {
        setError(translateAuthError(error.message));
      } else {
        // 리다이렉트가 성공적으로 시작됨
        toast.loading('Google 로그인 중...');
      }
    } catch (error) {
      setError('Google 로그인 중 오류가 발생했습니다.');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const { error } = await auth.signInWithGithub();
      if (error) {
        setError(translateAuthError(error.message));
      } else {
        // 리다이렉트가 성공적으로 시작됨
        toast.loading('GitHub 로그인 중...');
      }
    } catch (error) {
      setError('GitHub 로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <Card className='mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-0 shadow-xl'>
      <CardHeader className='space-y-1 pb-4'>
        <div className='space-y-2'>
          {/* 소셜 로그인 버튼들 */}
          <Button
            variant='outline'
            className='w-full h-11'
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <Mail className='mr-2 h-4 w-4' />
            Google로 로그인
          </Button>

          <Button
            variant='outline'
            className='w-full h-11'
            onClick={handleGithubSignIn}
            disabled={isLoading}
          >
            <Github className='mr-2 h-4 w-4' />
            GitHub로 로그인
          </Button>
        </div>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-gray-300 dark:border-gray-600' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-white dark:bg-slate-800 px-2 text-gray-500 dark:text-gray-400'>
              또는 이메일로 로그인
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {error && (
          <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3'>
            <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>이메일</Label>
            <Input
              id='email'
              type='email'
              placeholder='example@email.com'
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>비밀번호</Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='비밀번호를 입력하세요'
                {...register('password')}
                className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4 text-gray-400' />
                ) : (
                  <Eye className='h-4 w-4 text-gray-400' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <div className='text-sm'>
              <button
                type='button'
                className='font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400'
                onClick={() => {
                  // TODO: 비밀번호 재설정 기능 구현
                  alert('비밀번호 재설정 기능은 준비 중입니다.');
                }}
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>
          </div>

          <Button type='submit' className='w-full h-11' disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <div className='text-center text-sm'>
          <span className='text-gray-600 dark:text-gray-400'>
            아직 계정이 없으신가요?{' '}
          </span>
          <Link
            href='/signup'
            className='font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400'
          >
            회원가입
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
