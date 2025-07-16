import { ContactForm } from '@/components/contact/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* 헤더 */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4'>
            문의하기
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto whitespace-pre-line'>
            AIMOA에 대한 의견이나 제안사항이 있으시면 언제든지 연락주세요.
            <br />
            여러분의 소중한 피드백을 기다리고 있습니다.
          </p>
        </div>

        {/* 연락처 정보 */}
        <Card className='mb-8 border-gray-200 dark:border-gray-700'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <MessageSquare className='w-5 h-5' />
              연락처 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='flex items-start gap-3'>
                <Mail className='w-5 h-5 text-blue-600 mt-1' />
                <div>
                  <h3 className='font-medium text-gray-900 dark:text-white'>
                    이메일
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>
                    aimoa0125@gmail.com
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <Clock className='w-5 h-5 text-blue-600 mt-1' />
                <div>
                  <h3 className='font-medium text-gray-900 dark:text-white'>
                    응답 시간
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>
                    1-2 영업일 내 답변
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <MapPin className='w-5 h-5 text-blue-600 mt-1' />
                <div>
                  <h3 className='font-medium text-gray-900 dark:text-white'>
                    서비스 지역
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>대한민국</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 문의 폼 */}
        <Card className='border-gray-200 dark:border-gray-700'>
          <CardHeader>
            <CardTitle>문의 양식</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
