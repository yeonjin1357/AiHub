import nodemailer from 'nodemailer';

// 환경 변수 검증
const requiredEnvVars = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  EMAIL_TO: process.env.EMAIL_TO,
};

// 누락된 환경 변수 확인
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

// 환경 변수 누락 시 콘솔 출력으로 대체

// SMTP 설정
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  // 환경 변수가 설정되지 않은 경우 로그 출력으로 대체
  if (missingVars.length > 0) {
    return;
  }

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.EMAIL_TO,
    replyTo: data.email, // 사용자 이메일로 답장 가능
    subject: `[AIMOA 문의] ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">AIMOA 새로운 문의</h1>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            문의자 정보
          </h2>
          <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 8px 0;"><strong>이름:</strong> ${data.name}</p>
            <p style="margin: 8px 0;"><strong>이메일:</strong> ${data.email}</p>
            <p style="margin: 8px 0;"><strong>제목:</strong> ${data.subject}</p>
          </div>
          
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            문의 내용
          </h2>
          <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
            <div style="white-space: pre-wrap; color: #374151;">${data.message}</div>
          </div>
        </div>
        
        <div style="background: #eff6ff; padding: 15px; text-align: center; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="margin: 0; color: #1e40af; font-size: 14px;">
            📧 이 메시지는 AIMOA 웹사이트 문의 폼을 통해 전송되었습니다.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('이메일 전송에 실패했습니다.');
  }
}

// 이메일 설정 테스트 함수
export async function testEmailConnection(): Promise<boolean> {
  if (missingVars.length > 0) {
    return false;
  }

  try {
    await transporter.verify();
    return true;
  } catch (error) {
    return false;
  }
}