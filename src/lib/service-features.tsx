import { 
  Globe, 
  Shield, 
  Users, 
  Smartphone, 
  Zap, 
  Clock, 
  CreditCard, 
  Code, 
  Languages, 
  Download,
  Upload,
  Wifi,
  Building,
  GraduationCap,
  Crown,
  Bot,
  FileText,
  Image,
  Video,
  Mic,
  MessageSquare,
  Search,
  BarChart,
  Palette,
  Edit,
  Calendar,
  Mail,
  Database,
  Key,
  Award,
  Target,
  Briefcase,
  Heart,
  Star,
  Puzzle,
  RefreshCw,
  Headphones,
  BookOpen,
  LucideIcon
} from 'lucide-react';

// 서비스 특성 타입 정의
export interface ServiceFeature {
  icon: LucideIcon;
  label: string;
  description: string;
  category: 'platform' | 'security' | 'usage' | 'pricing' | 'integration' | 'support';
}

// 서비스 특성 매핑
export const SERVICE_FEATURES: Record<string, ServiceFeature> = {
  // 플랫폼 관련
  web_based: {
    icon: Globe,
    label: '웹 기반 서비스',
    description: '브라우저에서 바로 사용 가능',
    category: 'platform'
  },
  mobile_app: {
    icon: Smartphone,
    label: '모바일 앱 지원',
    description: 'iOS, Android 앱 제공',
    category: 'platform'
  },
  desktop_app: {
    icon: Download,
    label: '데스크톱 앱',
    description: 'Windows, Mac, Linux 지원',
    category: 'platform'
  },
  browser_extension: {
    icon: Puzzle,
    label: '브라우저 확장',
    description: 'Chrome, Edge 등 확장 프로그램',
    category: 'platform'
  },
  offline_support: {
    icon: Wifi,
    label: '오프라인 지원',
    description: '인터넷 없이도 일부 기능 이용',
    category: 'platform'
  },

  // 보안 관련
  data_security: {
    icon: Shield,
    label: '데이터 보안',
    description: '엔터프라이즈급 보안 시스템',
    category: 'security'
  },
  gdpr_compliant: {
    icon: Key,
    label: 'GDPR 준수',
    description: '개인정보 보호 규정 준수',
    category: 'security'
  },
  end_to_end_encryption: {
    icon: Database,
    label: '종단간 암호화',
    description: '데이터 전송 시 완전 암호화',
    category: 'security'
  },
  local_storage: {
    icon: Database,
    label: '로컬 데이터 저장',
    description: '국내 서버에 데이터 보관',
    category: 'security'
  },

  // 사용 대상
  individual_use: {
    icon: Users,
    label: '개인 사용자',
    description: '개인 프로젝트에 최적화',
    category: 'usage'
  },
  team_collaboration: {
    icon: Users,
    label: '팀 협업',
    description: '팀 단위 협업 기능 제공',
    category: 'usage'
  },
  enterprise_ready: {
    icon: Building,
    label: '기업용',
    description: '대기업 환경에 최적화',
    category: 'usage'
  },
  beginner_friendly: {
    icon: GraduationCap,
    label: '초보자 친화적',
    description: '쉬운 사용법과 가이드 제공',
    category: 'usage'
  },
  professional_grade: {
    icon: Crown,
    label: '전문가급',
    description: '고급 사용자를 위한 기능',
    category: 'usage'
  },

  // 가격 관련
  free_tier: {
    icon: Heart,
    label: '무료 플랜',
    description: '기본 기능 무료 제공',
    category: 'pricing'
  },
  free_trial: {
    icon: Clock,
    label: '무료 체험',
    description: '7-30일 무료 체험 가능',
    category: 'pricing'
  },
  subscription_model: {
    icon: CreditCard,
    label: '구독 모델',
    description: '월/연 구독 서비스',
    category: 'pricing'
  },
  pay_per_use: {
    icon: Target,
    label: '사용량 기반',
    description: '사용한 만큼만 결제',
    category: 'pricing'
  },
  one_time_payment: {
    icon: Award,
    label: '일회 구매',
    description: '한 번 구매로 평생 사용',
    category: 'pricing'
  },

  // 통합 관련
  api_available: {
    icon: Code,
    label: 'API 제공',
    description: '개발자를 위한 API 지원',
    category: 'integration'
  },
  slack_integration: {
    icon: MessageSquare,
    label: 'Slack 연동',
    description: 'Slack과 완벽 통합',
    category: 'integration'
  },
  discord_integration: {
    icon: MessageSquare,
    label: 'Discord 연동',
    description: 'Discord와 완벽 통합',
    category: 'integration'
  },
  zapier_support: {
    icon: Zap,
    label: 'Zapier 지원',
    description: '3000+ 앱과 자동화 연결',
    category: 'integration'
  },
  export_import: {
    icon: Upload,
    label: '데이터 내보내기',
    description: '다양한 형식으로 데이터 백업',
    category: 'integration'
  },

  // 지원 관련
  korean_support: {
    icon: Languages,
    label: '한국어 지원',
    description: '완전한 한국어 인터페이스',
    category: 'support'
  },
  multilingual: {
    icon: Languages,
    label: '다국어 지원',
    description: '10개 이상 언어 지원',
    category: 'support'
  },
  customer_support: {
    icon: Headphones,
    label: '고객 지원',
    description: '24/7 고객 서비스 제공',
    category: 'support'
  },
  documentation: {
    icon: BookOpen,
    label: '상세 문서',
    description: '완벽한 사용 가이드 제공',
    category: 'support'
  },
  regular_updates: {
    icon: RefreshCw,
    label: '정기 업데이트',
    description: '주기적인 기능 개선',
    category: 'support'
  },

  // AI 기능별
  text_generation: {
    icon: FileText,
    label: '텍스트 생성',
    description: 'AI 기반 텍스트 작성',
    category: 'platform'
  },
  image_generation: {
    icon: Image,
    label: '이미지 생성',
    description: 'AI 이미지 제작 도구',
    category: 'platform'
  },
  video_generation: {
    icon: Video,
    label: '비디오 생성',
    description: 'AI 영상 제작 기능',
    category: 'platform'
  },
  voice_synthesis: {
    icon: Mic,
    label: '음성 합성',
    description: 'AI 음성 생성 기술',
    category: 'platform'
  },
  code_assistant: {
    icon: Code,
    label: '코드 어시스턴트',
    description: 'AI 프로그래밍 도움',
    category: 'platform'
  },
  data_analysis: {
    icon: BarChart,
    label: '데이터 분석',
    description: 'AI 기반 데이터 분석',
    category: 'platform'
  },
  design_tools: {
    icon: Palette,
    label: '디자인 도구',
    description: 'AI 디자인 어시스턴트',
    category: 'platform'
  },
  content_editing: {
    icon: Edit,
    label: '콘텐츠 편집',
    description: 'AI 콘텐츠 편집 기능',
    category: 'platform'
  }
};

// 서비스 이름별 특성 매핑 (실제 서비스에 맞게 설정)
export const getServiceFeatures = (serviceName: string, serviceFeatures: string[]): string[] => {
  const name = serviceName.toLowerCase();
  
  // ChatGPT 계열
  if (name.includes('chatgpt') || name.includes('openai')) {
    return ['web_based', 'mobile_app', 'data_security', 'team_collaboration', 'api_available', 'multilingual', 'regular_updates'];
  }
  
  // Claude 계열
  if (name.includes('claude') || name.includes('anthropic')) {
    return ['web_based', 'data_security', 'individual_use', 'free_tier', 'api_available', 'korean_support', 'customer_support'];
  }
  
  // Midjourney 계열
  if (name.includes('midjourney')) {
    return ['discord_integration', 'image_generation', 'subscription_model', 'professional_grade', 'customer_support', 'regular_updates'];
  }
  
  // Notion 계열
  if (name.includes('notion')) {
    return ['web_based', 'mobile_app', 'desktop_app', 'team_collaboration', 'free_tier', 'api_available', 'multilingual'];
  }
  
  // GitHub Copilot 계열
  if (name.includes('copilot') || name.includes('github')) {
    return ['code_assistant', 'api_available', 'subscription_model', 'professional_grade', 'team_collaboration', 'regular_updates'];
  }
  
  // 기본값: 서비스 기능에 따라 자동 추론
  const defaultFeatures = ['web_based', 'data_security', 'individual_use'];
  
  // 서비스 기능을 기반으로 특성 추론
  const inferredFeatures = [];
  
  serviceFeatures.forEach(feature => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('텍스트') || lowerFeature.includes('글쓰기')) {
      inferredFeatures.push('text_generation');
    }
    if (lowerFeature.includes('이미지') || lowerFeature.includes('그림')) {
      inferredFeatures.push('image_generation');
    }
    if (lowerFeature.includes('비디오') || lowerFeature.includes('영상')) {
      inferredFeatures.push('video_generation');
    }
    if (lowerFeature.includes('음성') || lowerFeature.includes('보이스')) {
      inferredFeatures.push('voice_synthesis');
    }
    if (lowerFeature.includes('코드') || lowerFeature.includes('프로그래밍')) {
      inferredFeatures.push('code_assistant');
    }
    if (lowerFeature.includes('분석') || lowerFeature.includes('데이터')) {
      inferredFeatures.push('data_analysis');
    }
    if (lowerFeature.includes('디자인') || lowerFeature.includes('ui')) {
      inferredFeatures.push('design_tools');
    }
  });
  
  return [...defaultFeatures, ...inferredFeatures].slice(0, 6); // 최대 6개로 제한
};