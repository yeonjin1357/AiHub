import { SignInForm } from '@/components/auth/signin-form';
import { AuthHeader } from '@/components/auth/auth-header';

export default function SignInPage() {
  return (
    <>
      <AuthHeader 
        title="로그인"
        subtitle="AIMOA에 오신 것을 환영합니다"
      />
      <SignInForm />
    </>
  );
}