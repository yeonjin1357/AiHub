import { SignUpForm } from '@/components/auth/signup-form';
import { AuthHeader } from '@/components/auth/auth-header';

export default function SignUpPage() {
  return (
    <>
      <AuthHeader 
        title="회원가입"
        subtitle="AIMOA와 함께 시작하세요"
      />
      <SignUpForm />
    </>
  );
}