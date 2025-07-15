import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: '이메일이 필요합니다.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // user_profiles 테이블에서 이메일 중복 확인
    const { data, error } = await supabase
      .from('user_profiles')
      .select('email')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116: 결과가 없음 (중복 아님)
      console.error('Email check error:', error);
      return NextResponse.json(
        { error: '이메일 확인 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const isEmailTaken = data !== null;

    return NextResponse.json({
      isEmailTaken,
      message: isEmailTaken ? '이미 사용 중인 이메일입니다.' : '사용 가능한 이메일입니다.'
    });

  } catch (error) {
    console.error('Email check API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}