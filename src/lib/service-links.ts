// 서비스별 유용한 링크들
export interface ServiceLink {
  label: string;
  url: string;
  icon: 'pricing' | 'docs' | 'tutorial' | 'support' | 'api' | 'community' | 'blog' | 'download' | 'demo';
  description: string;
}

// 서비스별 링크 데이터베이스 (더 쉽게 관리할 수 있도록)
export const SERVICE_LINKS_DB: Record<string, ServiceLink[]> = {
  // OpenAI / ChatGPT
  'chatgpt': [
    {
      label: '요금제 보기',
      url: 'https://openai.com/pricing',
      icon: 'pricing',
      description: 'ChatGPT Plus, Pro 등 구독 플랜'
    },
    {
      label: '사용 가이드',
      url: 'https://help.openai.com/en/collections/3742473-chatgpt',
      icon: 'docs',
      description: 'ChatGPT 사용법 및 팁'
    },
    {
      label: 'API 문서',
      url: 'https://platform.openai.com/docs',
      icon: 'api',
      description: 'OpenAI API 개발자 문서'
    },
    {
      label: '고객 지원',
      url: 'https://help.openai.com',
      icon: 'support',
      description: '문제 해결 및 고객 서비스'
    }
  ],

  // Claude / Anthropic
  'claude': [
    {
      label: '요금제 보기',
      url: 'https://claude.ai/pricing',
      icon: 'pricing',
      description: 'Claude Pro 구독 및 API 요금'
    },
    {
      label: '사용 가이드',
      url: 'https://support.anthropic.com',
      icon: 'docs',
      description: 'Claude 활용법 및 모범 사례'
    },
    {
      label: 'API 문서',
      url: 'https://docs.anthropic.com',
      icon: 'api',
      description: 'Claude API 개발자 가이드'
    },
    {
      label: '고객 지원',
      url: 'https://support.anthropic.com',
      icon: 'support',
      description: '기술 지원 및 문의'
    }
  ],

  // Midjourney
  'midjourney': [
    {
      label: '구독 플랜',
      url: 'https://www.midjourney.com/account',
      icon: 'pricing',
      description: 'Basic, Standard, Pro 플랜'
    },
    {
      label: '사용자 가이드',
      url: 'https://docs.midjourney.com',
      icon: 'docs',
      description: '프롬프트 작성법 및 팁'
    },
    {
      label: '튜토리얼',
      url: 'https://docs.midjourney.com/docs/quick-start',
      icon: 'tutorial',
      description: '처음 시작하는 방법'
    },
    {
      label: 'Discord 커뮤니티',
      url: 'https://discord.gg/midjourney',
      icon: 'community',
      description: '공식 Discord 커뮤니티'
    }
  ],

  // Notion
  'notion': [
    {
      label: '요금제 비교',
      url: 'https://www.notion.so/pricing',
      icon: 'pricing',
      description: 'Personal, Pro, Team 플랜'
    },
    {
      label: '도움말 센터',
      url: 'https://www.notion.so/help',
      icon: 'docs',
      description: '모든 기능 사용법 가이드'
    },
    {
      label: '템플릿 갤러리',
      url: 'https://www.notion.so/templates',
      icon: 'tutorial',
      description: '바로 사용할 수 있는 템플릿'
    },
    {
      label: '고객 지원',
      url: 'https://www.notion.so/contact',
      icon: 'support',
      description: '기술 지원 및 문의'
    }
  ],

  // GitHub Copilot
  'github-copilot': [
    {
      label: '구독 요금',
      url: 'https://github.com/features/copilot#pricing',
      icon: 'pricing',
      description: 'Individual, Business 플랜'
    },
    {
      label: '시작하기 가이드',
      url: 'https://docs.github.com/en/copilot/quickstart',
      icon: 'docs',
      description: 'Copilot 설치 및 설정'
    },
    {
      label: '사용법 배우기',
      url: 'https://docs.github.com/en/copilot/using-github-copilot',
      icon: 'tutorial',
      description: '효과적인 코딩 팁'
    },
    {
      label: 'GitHub 지원',
      url: 'https://support.github.com',
      icon: 'support',
      description: '기술 지원 및 문의'
    }
  ],

  // 여기에 더 많은 서비스를 추가할 수 있습니다...
  // 'canva': [...],
  // 'figma': [...],
  // 'grammarly': [...],
};

// 서비스 이름을 키로 변환하는 함수 (매칭을 위해)
function normalizeServiceName(serviceName: string): string {
  const name = serviceName.toLowerCase();
  
  // 특별한 매칭 규칙들
  if (name.includes('chatgpt') || name.includes('openai')) return 'chatgpt';
  if (name.includes('claude') || name.includes('anthropic')) return 'claude';
  if (name.includes('midjourney')) return 'midjourney';
  if (name.includes('notion')) return 'notion';
  if (name.includes('copilot') || name.includes('github')) return 'github-copilot';
  
  // 기본: 첫 번째 단어를 키로 사용
  return name.split(' ')[0];
}

// 메인 함수: 서비스 이름으로 링크 가져오기
export const getServiceLinks = (serviceName: string, websiteUrl: string): ServiceLink[] => {
  const normalizedName = normalizeServiceName(serviceName);
  
  // 데이터베이스에서 링크 찾기
  if (SERVICE_LINKS_DB[normalizedName]) {
    return SERVICE_LINKS_DB[normalizedName];
  }
  
  // 기본값: 일반적인 서비스용 (데이터베이스에 없는 경우)
  const baseUrl = new URL(websiteUrl).origin;
  return [
    {
      label: '요금제 보기',
      url: `${baseUrl}/pricing`,
      icon: 'pricing',
      description: '구독 플랜 및 가격 정보'
    },
    {
      label: '도움말',
      url: `${baseUrl}/help`,
      icon: 'docs',
      description: '사용법 및 가이드'
    },
    {
      label: '시작하기',
      url: `${baseUrl}/getting-started`,
      icon: 'tutorial',
      description: '첫 사용자를 위한 가이드'
    },
    {
      label: '고객 지원',
      url: `${baseUrl}/support`,
      icon: 'support',
      description: '문의 및 기술 지원'
    }
  ];
};