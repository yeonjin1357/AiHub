'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Eye,
  EyeOff,
  Github,
  Mail,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';
import { auth } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { translateAuthError } from '@/utils/auth-errors';
import { toast } from 'sonner';

const signUpSchema = z
  .object({
    name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
    email: z.string().email('올바른 이메일 주소를 입력해주세요'),
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: '이용약관에 동의해주세요',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<{
    isChecking: boolean;
    isValid: boolean | null;
    message: string;
  }>({ isChecking: false, isValid: null, message: '' });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const termsAccepted = watch('termsAccepted');
  const emailValue = watch('email');
  const nameValue = watch('name');
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  // 이메일 중복 체크 함수
  const checkEmailAvailability = useCallback(async (email: string) => {
    if (!email || !email.includes('@')) {
      setEmailStatus({ isChecking: false, isValid: null, message: '' });
      return;
    }

    setEmailStatus({ isChecking: true, isValid: null, message: '' });

    try {
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setEmailStatus({
          isChecking: false,
          isValid: null,
          message: data.error || '이메일 확인 중 오류가 발생했습니다.',
        });
        return;
      }

      setEmailStatus({
        isChecking: false,
        isValid: !data.isEmailTaken,
        message: data.message,
      });
    } catch (error) {
      setEmailStatus({
        isChecking: false,
        isValid: null,
        message: '네트워크 오류가 발생했습니다.',
      });
    }
  }, []);

  // 이메일 값 변경 감지
  useEffect(() => {
    if (emailValue) {
      const timeoutId = setTimeout(() => {
        checkEmailAvailability(emailValue);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setEmailStatus({ isChecking: false, isValid: null, message: '' });
    }
  }, [emailValue, checkEmailAvailability]);

  // 폼 유효성 검사 상태
  const isFormValid =
    nameValue?.trim() &&
    emailValue?.trim() &&
    passwordValue?.trim() &&
    confirmPasswordValue?.trim() &&
    termsAccepted &&
    emailStatus.isValid === true &&
    !emailStatus.isChecking &&
    Object.keys(errors).length === 0;

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { data: authData, error: authError } = await auth.signUp(
        data.email,
        data.password,
        data.name
      );

      if (authError) {
        setError(translateAuthError(authError.message));
        return;
      }

      if (authData.user) {
        setSuccess('가입이 완료되었습니다! 이메일을 확인해주세요.');
        toast.success('회원가입이 완료되었습니다! 이메일을 확인해주세요.');
        // 이메일 확인이 필요한 경우가 많으므로 바로 리다이렉트하지 않음
      }
    } catch (error) {
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await auth.signInWithGoogle();
      if (error) {
        setError(translateAuthError(error.message));
      } else {
        toast.loading('Google 가입 중...');
      }
    } catch (error) {
      setError('Google 가입 중 오류가 발생했습니다.');
    }
  };

  const handleGithubSignUp = async () => {
    try {
      const { error } = await auth.signInWithGithub();
      if (error) {
        setError(translateAuthError(error.message));
      } else {
        toast.loading('GitHub 가입 중...');
      }
    } catch (error) {
      setError('GitHub 가입 중 오류가 발생했습니다.');
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
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            <Mail className='mr-2 h-4 w-4' />
            Google로 가입하기
          </Button>

          <Button
            variant='outline'
            className='w-full h-11'
            onClick={handleGithubSignUp}
            disabled={isLoading}
          >
            <Github className='mr-2 h-4 w-4' />
            GitHub로 가입하기
          </Button>
        </div>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-gray-300 dark:border-gray-600' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-white dark:bg-slate-800 px-2 text-gray-500 dark:text-gray-400'>
              또는 이메일로 가입하기
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

        {success && (
          <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3'>
            <p className='text-sm text-green-600 dark:text-green-400'>
              {success}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>이름</Label>
            <Input
              id='name'
              type='text'
              placeholder='홍길동'
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            <div className='h-1 flex items-start'>
              {errors.name && (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>이메일</Label>
            <div className='relative'>
              <Input
                id='email'
                type='email'
                placeholder='example@email.com'
                {...register('email')}
                className={`pr-10 ${
                  errors.email || emailStatus.isValid === false
                    ? 'border-red-500'
                    : emailStatus.isValid === true
                    ? 'border-green-500'
                    : ''
                }`}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                {emailStatus.isChecking && (
                  <Loader2 className='h-4 w-4 animate-spin text-gray-400' />
                )}
                {!emailStatus.isChecking && emailStatus.isValid === true && (
                  <CheckCircle className='h-4 w-4 text-green-500' />
                )}
                {!emailStatus.isChecking && emailStatus.isValid === false && (
                  <XCircle className='h-4 w-4 text-red-500' />
                )}
              </div>
            </div>
            <div className='h-1 flex items-start'>
              {errors.email && (
                <p className='text-xs text-red-500'>{errors.email.message}</p>
              )}
              {!errors.email && emailStatus.message && (
                <p
                  className={`text-xs ${
                    emailStatus.isValid === true
                      ? 'text-green-600'
                      : emailStatus.isValid === false
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {emailStatus.message}
                </p>
              )}
            </div>
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
            <div className='h-1 flex items-start'>
              {errors.password && (
                <p className='text-xs text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>비밀번호 확인</Label>
            <div className='relative'>
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='비밀번호를 다시 입력하세요'
                {...register('confirmPassword')}
                className={
                  errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'
                }
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className='h-4 w-4 text-gray-400' />
                ) : (
                  <Eye className='h-4 w-4 text-gray-400' />
                )}
              </button>
            </div>
            <div className='h-1 flex items-start'>
              {errors.confirmPassword && (
                <p className='text-xs text-red-500'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='terms'
              checked={termsAccepted}
              onCheckedChange={(checked) =>
                setValue('termsAccepted', checked as boolean)
              }
            />
            <Label htmlFor='terms' className='text-sm'>
              <button
                type='button'
                className='text-blue-600 hover:text-blue-500 dark:text-blue-400'
                onClick={() => alert('이용약관 페이지는 준비 중입니다.')}
              >
                이용약관
              </button>{' '}
              및{' '}
              <button
                type='button'
                className='text-blue-600 hover:text-blue-500 dark:text-blue-400'
                onClick={() =>
                  alert('개인정보처리방침 페이지는 준비 중입니다.')
                }
              >
                개인정보처리방침
              </button>
              에 동의합니다
            </Label>
          </div>
          <div className='h-4 flex items-start'>
            {errors.termsAccepted && (
              <p className='text-xs text-red-500'>
                {errors.termsAccepted.message}
              </p>
            )}
          </div>

          <Button
            type='submit'
            className='w-full h-11'
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? '가입 중...' : '회원가입'}
          </Button>
        </form>

        <div className='text-center text-sm'>
          <span className='text-gray-600 dark:text-gray-400'>
            이미 계정이 있으신가요?{' '}
          </span>
          <Link
            href='/signin'
            className='font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400'
          >
            로그인
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
