import { ContactForm } from '@/components/contact/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react';
import { Header } from '@/components/layout/header';

export const metadata = {
  title: '문의하기',
  description: 'AIMOA에 대한 의견이나 제안사항을 보내주세요. 여러분의 소중한 피드백을 기다리고 있습니다.',
};

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-[#0a0a0b]'>
      <Header />
      
      {/* Background gradient effects */}
      <div className='fixed inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[128px] rounded-full animate-blob' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[128px] rounded-full animate-blob animation-delay-2000' />
      </div>
      
      <div className='relative py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* 헤더 */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl font-bold text-white sm:text-4xl mb-4'>
            문의하기
          </h1>
          <p className='text-xl text-zinc-400 max-w-2xl mx-auto whitespace-pre-line'>
            AIMOA에 대한 의견이나 제안사항이 있으시면 언제든지 연락주세요.
            <br />
            여러분의 소중한 피드백을 기다리고 있습니다.
          </p>
        </div>

        {/* 연락처 정보 */}
        <Card className='mb-8 glass border-0 gradient-border-effect'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-white'>
              <div className='p-2 bg-blue-600/20 rounded-lg'>
                <MessageSquare className='w-5 h-5 text-blue-400' />
              </div>
              연락처 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='flex items-start gap-3'>
                <div className='p-2 bg-blue-600/20 rounded-lg'>
                  <Mail className='w-5 h-5 text-blue-400' />
                </div>
                <div>
                  <h3 className='font-medium text-white'>
                    이메일
                  </h3>
                  <p className='text-zinc-400'>
                    aimoa0125@gmail.com
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <div className='p-2 bg-green-600/20 rounded-lg'>
                  <Clock className='w-5 h-5 text-green-400' />
                </div>
                <div>
                  <h3 className='font-medium text-white'>
                    응답 시간
                  </h3>
                  <p className='text-zinc-400'>
                    1-2 영업일 내 답변
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <div className='p-2 bg-purple-600/20 rounded-lg'>
                  <MapPin className='w-5 h-5 text-purple-400' />
                </div>
                <div>
                  <h3 className='font-medium text-white'>
                    서비스 지역
                  </h3>
                  <p className='text-zinc-400'>대한민국</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 문의 폼 */}
        <Card className='glass border-0 gradient-border-effect'>
          <CardHeader>
            <CardTitle className='text-white'>문의 양식</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}
