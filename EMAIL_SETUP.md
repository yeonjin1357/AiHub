# 이메일 전송 설정 가이드

## Gmail SMTP 설정 방법

실제로 문의 이메일을 받으려면 다음 단계를 따라 설정해주세요:

### 1. Gmail 계정 설정

1. Gmail 계정에 로그인
2. Google 계정 설정 → 보안으로 이동
3. "2단계 인증" 활성화 (필수)
4. "앱 비밀번호" 생성
   - 앱 선택: "메일"
   - 기기 선택: "기타 (사용자 설정 이름)"
   - 이름: "AIMOA 웹사이트"
   - 생성된 16자리 비밀번호 복사

### 2. 환경 변수 설정

`.env.local` 파일에서 다음 값들을 실제 정보로 변경:

```env
# 보내는 이메일 계정 (Gmail)
SMTP_USER=your-gmail@gmail.com
# 앱 비밀번호 (16자리)
SMTP_PASS=generated-app-password
# 받는 이메일 (기본값 유지 또는 변경)
EMAIL_TO=aimoa0125@gmail.com
```

### 3. 테스트

설정 완료 후 웹사이트에서 문의를 전송하면:
- 설정이 올바른 경우: 실제 이메일 전송
- 설정이 없는 경우: 콘솔에 로그만 출력

### 4. 다른 이메일 서비스 사용

Gmail 외에 다른 SMTP 서비스를 사용하려면:

```env
# 예: Outlook
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password

# 예: 네이버
SMTP_HOST=smtp.naver.com
SMTP_PORT=587
SMTP_USER=your-email@naver.com
SMTP_PASS=your-password
```

## 보안 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- 앱 비밀번호는 안전하게 보관하세요
- 정기적으로 앱 비밀번호를 갱신하세요