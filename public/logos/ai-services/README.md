# AI 서비스 로고 디렉토리

이 폴더는 AI 서비스들의 로고 파일을 저장하는 곳입니다.

## 파일 명명 규칙

- 파일명은 소문자와 하이픈으로 구성: `service-name.svg`
- 예시: `chat-gpt.svg`, `claude.svg`, `midjourney.svg`

## 권장 사항

- **파일 형식**: SVG (벡터 형식, 확장성 좋음)
- **크기**: 64x64px 또는 128x128px
- **배경**: 투명 배경 권장
- **색상**: 원본 브랜드 색상 유지

## 사용 방법

```tsx
import Image from 'next/image';

<Image
  src="/logos/ai-services/chat-gpt.svg"
  alt="ChatGPT Logo"
  width={64}
  height={64}
/>
```

## 로고 라이선스

각 로고는 해당 회사/서비스의 저작권을 따릅니다.
상업적 사용 시 각 회사의 브랜드 가이드라인을 확인하세요.