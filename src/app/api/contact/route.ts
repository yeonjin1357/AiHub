import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, type ContactFormData } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // 입력 유효성 검사
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '모든 필수 항목을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 메시지 길이 제한
    if (message.length > 2000) {
      return NextResponse.json(
        { error: '메시지는 2000자를 초과할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 이메일 전송
    const contactData: ContactFormData = {
      name,
      email,
      subject,
      message,
    };

    await sendContactEmail(contactData);

    // 성공 응답
    return NextResponse.json(
      { 
        message: '문의가 성공적으로 전송되었습니다.',
        data: {
          name,
          email,
          subject,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}