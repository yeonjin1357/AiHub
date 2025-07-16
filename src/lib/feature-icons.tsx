import {
  MessageSquare,
  MessagesSquare,
  MessageSquareMore,
  Image,
  Code,
  Mic,
  Video,
  FileText,
  Globe,
  Search,
  Brain,
  Palette,
  Music,
  BookOpen,
  Camera,
  Edit,
  Languages,
  BarChart,
  Lightbulb,
  PenTool,
  Headphones,
  Clapperboard,
  ScanText,
  TrendingUp,
  Target,
  UserCheck,
  Sparkles,
  Brush,
  Type,
  Scissors,
  Volume2,
  PlayCircle,
  Workflow,
  BrainCircuit,
  GraduationCap,
  PencilLine,
  Bug,
  Zap,
  Eye,
  TestTube,
  Shield,
  Folder,
  Terminal,
  GitBranch,
  Code2,
  Monitor,
  BookText,
  User,
  Tag,
  Gamepad2,
  PieChart,
  Filter,
  Calculator,
  Cpu,
  Maximize,
  Expand,
  Eraser,
  Wand2,
  Users,
  Box,
  Copy,
  Heart,
  Settings,
  Sliders,
  Smartphone,
  Highlighter,
  Shuffle,
  Link,
  Upload,
  Megaphone,
  Share2,
  Mail,
  Rss,
  Clock,
  CheckCircle,
  Layers,
  Play,
  PanelTop,
  LayoutTemplate,
  Download,
  Package,
  Database,
  Rocket,
  Bot,
  Layout,
  HardDrive,
  Star,
  Briefcase,
  Shapes,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// AI 서비스 기능들과 아이콘, 설명 매핑
export const featureData: Record<
  string,
  { icon: LucideIcon; description: string }
> = {
  // 핵심 대화 및 텍스트 기능
  '챗봇 대화': {
    icon: MessagesSquare,
    description:
      '자연스러운 대화형 인터페이스로 질문하고 답변을 받을 수 있습니다.',
  },
  '텍스트 생성': {
    icon: MessageSquareMore,
    description:
      '다양한 형태의 창의적이고 전문적인 텍스트를 자동으로 생성합니다.',
  },
  '언어 번역': {
    icon: Languages,
    description: '100개 이상의 언어를 정확하고 자연스럽게 번역합니다.',
  },
  '문서 요약': {
    icon: ScanText,
    description: '긴 문서의 핵심 내용을 간결하고 명확하게 요약합니다.',
  },
  '글쓰기 지원': {
    icon: PencilLine,
    description: '블로그, 에세이, 보고서 등 다양한 형태의 글쓰기를 도와줍니다.',
  },

  // 개발 및 코딩 기능
  '코드 생성': {
    icon: Code,
    description:
      '다양한 프로그래밍 언어로 효율적이고 깔끔한 코드를 생성합니다.',
  },
  '코드 설명': {
    icon: FileText,
    description: '복잡한 코드를 이해하기 쉽게 설명하고 주석을 추가합니다.',
  },
  '버그 찾기': {
    icon: Bug,
    description: '코드의 오류와 버그를 자동으로 찾아 수정 방법을 제안합니다.',
  },
  '코드 자동완성': {
    icon: Zap,
    description:
      '코드 작성 중 실시간으로 적절한 코드를 제안하고 자동완성합니다.',
  },
  '코드 리뷰': {
    icon: Eye,
    description: '작성된 코드를 검토하고 개선 사항을 제안합니다.',
  },
  '테스트 생성': {
    icon: TestTube,
    description: '코드에 대한 단위 테스트와 통합 테스트를 자동으로 생성합니다.',
  },
  '보안 취약점 검사': {
    icon: Shield,
    description: '코드의 보안 취약점을 검사하고 보안 강화 방안을 제시합니다.',
  },
  '자연어 코딩': {
    icon: MessageSquare,
    description: '자연어로 설명하면 해당 기능을 구현하는 코드를 생성합니다.',
  },
  '코드베이스 이해': {
    icon: Folder,
    description: '대규모 코드베이스의 구조와 로직을 분석하고 설명합니다.',
  },
  '실시간 편집': {
    icon: Edit,
    description: '코드 편집 중 실시간으로 오류 검사와 개선 사항을 제안합니다.',
  },
  '터미널 통합': {
    icon: Terminal,
    description: '터미널 명령어를 자동으로 생성하고 실행 결과를 분석합니다.',
  },
  'git 통합': {
    icon: GitBranch,
    description: 'Git 명령어를 자동으로 생성하고 버전 관리를 지원합니다.',
  },
  '다양한 AI 모델': {
    icon: Brain,
    description: '여러 AI 모델을 활용하여 다양한 프로그래밍 작업을 수행합니다.',
  },
  '코딩 특화': {
    icon: Code2,
    description: '프로그래밍 언어별 특화된 코딩 지원을 제공합니다.',
  },
  '실시간 코드 제안': {
    icon: Lightbulb,
    description: '코드 작성 중 실시간으로 최적화된 코드를 제안합니다.',
  },
  '다양한 언어 지원': {
    icon: Globe,
    description: '다양한 프로그래밍 언어를 지원하여 개발 생산성을 높입니다.',
  },
  'IDE 통합': {
    icon: Monitor,
    description: '주요 IDE와 통합하여 개발 환경에서 직접 사용할 수 있습니다.',
  },
  '70+ 언어 지원': {
    icon: Languages,
    description: '70개 이상의 프로그래밍 언어를 지원합니다.',
  },

  // 창작 및 아이디어 기능
  브레인스토밍: {
    icon: Lightbulb,
    description:
      '창의적인 아이디어 발굴과 문제 해결을 위한 다각도 접근을 제공합니다.',
  },
  '학습 지원': {
    icon: GraduationCap,
    description:
      '개념 설명, 예제 제공, 단계별 학습으로 효과적인 학습을 돕습니다.',
  },
  '창작 지원': {
    icon: Brush,
    description:
      '소설, 시나리오, 창작물 작성을 위한 아이디어와 구조를 제공합니다.',
  },
  '창작 도구': {
    icon: Palette,
    description: '다양한 창작 활동을 지원하는 도구와 기능을 제공합니다.',
  },
  '아이디어 생성': {
    icon: Lightbulb,
    description: '새로운 아이디어와 컨셉을 생성하고 발전시킵니다.',
  },
  '스토리 생성': {
    icon: BookOpen,
    description: '흥미로운 스토리와 플롯을 자동으로 생성합니다.',
  },
  '소설 창작': {
    icon: BookText,
    description: '소설 작성을 위한 캐릭터, 배경, 플롯 개발을 지원합니다.',
  },
  '캐릭터 생성': {
    icon: User,
    description: '소설, 게임 등의 캐릭터를 생성하고 성격을 설정합니다.',
  },
  '세계관 구축': {
    icon: Globe,
    description: '판타지, SF 등의 세계관을 체계적으로 구축합니다.',
  },
  '장르 특화': {
    icon: Tag,
    description: '특정 장르에 특화된 창작 지원을 제공합니다.',
  },
  '커스텀 캐릭터 생성': {
    icon: UserCheck,
    description: '개인화된 캐릭터를 생성하고 커스터마이징할 수 있습니다.',
  },
  롤플레이: {
    icon: Gamepad2,
    description: '다양한 역할을 맡아 상호작용하는 롤플레이 경험을 제공합니다.',
  },
  'AI 캐릭터 대화': {
    icon: MessageSquare,
    description: '다양한 AI 캐릭터와 자연스러운 대화를 나눌 수 있습니다.',
  },

  // 분석 및 데이터 기능
  '데이터 분석': {
    icon: BarChart,
    description:
      '복잡한 데이터를 분석하여 의미있는 인사이트와 패턴을 발견합니다.',
  },
  '데이터 시각화': {
    icon: PieChart,
    description:
      '데이터를 차트와 그래프로 시각화하여 이해하기 쉽게 표현합니다.',
  },
  '통계 분석': {
    icon: TrendingUp,
    description: '데이터의 통계적 특성을 분석하고 인사이트를 제공합니다.',
  },
  머신러닝: {
    icon: BrainCircuit,
    description: '머신러닝 알고리즘을 활용하여 데이터를 학습하고 예측합니다.',
  },
  '자연어 쿼리': {
    icon: Search,
    description: '자연어로 데이터베이스를 검색하고 분석할 수 있습니다.',
  },
  '보고서 생성': {
    icon: FileText,
    description: '분석 결과를 바탕으로 전문적인 보고서를 자동 생성합니다.',
  },
  '노코드 분석': {
    icon: Workflow,
    description: '코딩 없이도 복잡한 데이터 분석을 수행할 수 있습니다.',
  },
  '데이터 정리': {
    icon: Filter,
    description:
      '비정형 데이터를 정리하고 구조화하여 분석 가능한 형태로 변환합니다.',
  },
  '예측 분석': {
    icon: Target,
    description: '과거 데이터를 바탕으로 미래 트렌드와 결과를 예측합니다.',
  },
  '수학 문제 해결': {
    icon: Calculator,
    description: '복잡한 수학 문제를 단계별로 해결하고 설명합니다.',
  },
  '고성능 추론': {
    icon: Cpu,
    description: '복잡한 논리적 추론을 빠르고 정확하게 수행합니다.',
  },

  // 멀티미디어 기능
  '이미지 생성': {
    icon: Image,
    description:
      '텍스트 설명을 바탕으로 창의적이고 고품질의 이미지를 생성합니다.',
  },
  '이미지 편집': {
    icon: Brush,
    description:
      '사진 보정, 스타일 변경, 객체 제거 등 전문적인 이미지 편집을 수행합니다.',
  },
  '음성 생성': {
    icon: Mic,
    description: '자연스럽고 감정이 담긴 음성으로 텍스트를 읽어줍니다.',
  },
  '음성 인식': {
    icon: Headphones,
    description: '음성을 정확하게 인식하여 텍스트로 변환합니다.',
  },
  '비디오 생성': {
    icon: Video,
    description:
      '스크립트나 이미지를 바탕으로 전문적인 영상 콘텐츠를 제작합니다.',
  },
  '비디오 편집': {
    icon: Clapperboard,
    description:
      '자동 편집, 자막 생성, 효과 추가 등 영상 후반 작업을 지원합니다.',
  },
  '음악 생성': {
    icon: Music,
    description: '장르, 분위기, 악기를 지정하여 오리지널 음악을 작곡합니다.',
  },
  'AI 아트': {
    icon: Palette,
    description: '다양한 스타일의 예술 작품을 AI로 생성합니다.',
  },
  '텍스트 to 이미지': {
    icon: Image,
    description: '텍스트 설명을 바탕으로 이미지를 생성합니다.',
  },
  '스타일 전송': {
    icon: Brush,
    description: '한 이미지의 스타일을 다른 이미지에 적용합니다.',
  },
  '텍스트-이미지 변환': {
    icon: Image,
    description: '텍스트를 이미지로 변환하여 시각적으로 표현합니다.',
  },
  '고해상도 생성': {
    icon: Maximize,
    description: '고품질의 고해상도 이미지를 생성합니다.',
  },
  아웃페인팅: {
    icon: Expand,
    description: '이미지 경계를 확장하여 더 넓은 장면을 생성합니다.',
  },
  인페인팅: {
    icon: Eraser,
    description: '이미지의 일부를 자연스럽게 채우고 복원합니다.',
  },
  '스타일 변환': {
    icon: Wand2,
    description: '이미지의 스타일을 다양한 예술 스타일로 변환합니다.',
  },
  '텍스트-비디오': {
    icon: Video,
    description: '텍스트 설명을 바탕으로 비디오 콘텐츠를 생성합니다.',
  },
  '이미지-비디오': {
    icon: Video,
    description: '정적 이미지를 동적 비디오로 변환합니다.',
  },
  '3D 애니메이션': {
    icon: Box,
    description: '3차원 애니메이션을 생성하고 편집합니다.',
  },
  '캐릭터 일관성': {
    icon: UserCheck,
    description: '비디오 전반에 걸쳐 캐릭터의 일관성을 유지합니다.',
  },
  '카메라 제어': {
    icon: Camera,
    description: '가상 카메라의 움직임과 앵글을 제어합니다.',
  },
  '영상 편집': {
    icon: Clapperboard,
    description: '영상 자르기, 합치기, 효과 추가 등 편집 작업을 수행합니다.',
  },
  '자동 편집': {
    icon: Scissors,
    description: '영상을 자동으로 편집하고 최적화합니다.',
  },
  '자동 자막': {
    icon: Type,
    description: '영상에 자동으로 자막을 생성하고 동기화합니다.',
  },
  '배경 제거': {
    icon: Eraser,
    description: '이미지나 영상에서 배경을 자동으로 제거합니다.',
  },
  '모션 브러시': {
    icon: Brush,
    description: '이미지의 특정 부분에 모션 효과를 추가합니다.',
  },
  '음성 합성': {
    icon: Mic,
    description: '텍스트를 자연스러운 음성으로 변환합니다.',
  },
  '음성 복제': {
    icon: Copy,
    description: '특정 사람의 목소리를 학습하여 복제합니다.',
  },
  '감정 표현': {
    icon: Heart,
    description: '음성에 다양한 감정을 표현하여 자연스럽게 만듭니다.',
  },
  '실시간 변환': {
    icon: Zap,
    description: '실시간으로 음성을 변환하고 처리합니다.',
  },
  '음성 디자인': {
    icon: Settings,
    description: '음성의 톤, 속도, 감정 등을 세밀하게 조정합니다.',
  },
  '120+ 음성': {
    icon: Users,
    description: '120개 이상의 다양한 음성을 제공합니다.',
  },
  '20+ 언어': {
    icon: Languages,
    description: '20개 이상의 언어를 지원합니다.',
  },
  '100+ 언어': {
    icon: Languages,
    description: '100개 이상의 언어를 지원합니다.',
  },
  '500+ 음성': {
    icon: Users,
    description: '500개 이상의 다양한 음성을 제공합니다.',
  },
  '배경음 추가': {
    icon: Volume2,
    description: '음성에 배경음악과 효과음을 추가합니다.',
  },
  '음성 편집': {
    icon: Edit,
    description: '음성을 자르고 편집하여 완성도를 높입니다.',
  },
  '자연스러운 음성': {
    icon: Volume2,
    description: '사람과 구별하기 어려운 자연스러운 음성을 생성합니다.',
  },
  '다양한 목소리': {
    icon: Users,
    description: '다양한 연령대와 성별의 목소리를 제공합니다.',
  },
  '한국어 특화': {
    icon: Languages,
    description: '한국어에 특화된 언어 처리 기능을 제공합니다.',
  },
  'AI 더빙': {
    icon: Mic,
    description: '영상에 AI 음성으로 더빙을 추가합니다.',
  },
  '텍스트-음악': {
    icon: Music,
    description: '텍스트 설명을 바탕으로 음악을 생성합니다.',
  },
  '보컬 생성': {
    icon: Mic,
    description: '가사에 맞는 보컬을 자동으로 생성합니다.',
  },
  '다양한 장르': { icon: Music, description: '다양한 음악 장르를 지원합니다.' },
  'AI 음악 생성': {
    icon: Music,
    description: 'AI를 활용하여 오리지널 음악을 작곡합니다.',
  },
  '오디오 편집': {
    icon: Headphones,
    description: '오디오 파일을 편집하고 품질을 향상시킵니다.',
  },
  '텍스트 편집': { icon: Edit, description: '텍스트를 편집하고 수정합니다.' },
  '화면 녹화': {
    icon: Video,
    description: '화면을 녹화하여 영상으로 저장합니다.',
  },
  '협업 기능': {
    icon: Users,
    description: '팀원들과 실시간으로 협업할 수 있는 기능을 제공합니다.',
  },
  '텍스트 읽기': {
    icon: Volume2,
    description: '텍스트를 음성으로 읽어줍니다.',
  },
  'PDF 지원': {
    icon: FileText,
    description: 'PDF 파일을 읽고 처리할 수 있습니다.',
  },
  '웹페이지 읽기': {
    icon: Globe,
    description: '웹페이지의 내용을 읽고 분석합니다.',
  },
  '속도 조절': {
    icon: Sliders,
    description: '음성의 속도를 조절할 수 있습니다.',
  },
  하이라이트: {
    icon: Highlighter,
    description: '중요한 부분을 하이라이트하여 표시합니다.',
  },
  '모바일 앱': {
    icon: Smartphone,
    description: '모바일 앱으로도 사용할 수 있습니다.',
  },
  '고품질 이미지': {
    icon: Image,
    description: '고품질의 이미지를 생성합니다.',
  },
  '아티스틱 스타일': {
    icon: Palette,
    description: '다양한 예술적 스타일을 적용합니다.',
  },
  업스케일링: {
    icon: TrendingUp,
    description: '이미지의 해상도를 향상시킵니다.',
  },
  배리에이션: {
    icon: Shuffle,
    description: '하나의 이미지에서 다양한 변형을 생성합니다.',
  },
  '커뮤니티 갤러리': {
    icon: Users,
    description: '사용자들이 만든 작품을 공유하는 갤러리를 제공합니다.',
  },
  'Discord 통합': {
    icon: MessageSquare,
    description: 'Discord와 연동하여 사용할 수 있습니다.',
  },

  // 검색 및 정보 기능
  '웹 검색': {
    icon: Search,
    description: '실시간 웹 정보를 검색하여 최신 정보를 제공합니다.',
  },
  '실시간 검색': {
    icon: Search,
    description: '실시간으로 최신 정보를 검색합니다.',
  },
  '출처 제공': { icon: Link, description: '정보의 출처를 명확히 제공합니다.' },
  'AI 답변': {
    icon: MessageSquare,
    description: '질문에 대한 정확하고 유용한 AI 답변을 제공합니다.',
  },
  '이미지 업로드': {
    icon: Upload,
    description: '이미지를 업로드하여 분석하고 처리할 수 있습니다.',
  },
  '팔로우업 질문': {
    icon: MessageSquare,
    description: '이전 대화를 바탕으로 관련 질문을 계속할 수 있습니다.',
  },
  'PDF 업로드': {
    icon: FileText,
    description: 'PDF 파일을 업로드하여 분석하고 처리할 수 있습니다.',
  },
  '실시간 정보': {
    icon: Clock,
    description: '실시간으로 업데이트되는 최신 정보를 제공합니다.',
  },
  'AI 검색': {
    icon: Search,
    description: 'AI 기반의 스마트 검색 기능을 제공합니다.',
  },
  '다중 AI 모델 지원': {
    icon: Brain,
    description: '여러 AI 모델을 동시에 활용할 수 있습니다.',
  },

  // 전문 분야 기능
  '문서 작성': {
    icon: FileText,
    description: '보고서, 제안서, 계약서 등 공식 문서를 전문적으로 작성합니다.',
  },
  '워크플로우 자동화': {
    icon: Workflow,
    description: '반복적인 업무 프로세스를 자동화하여 효율성을 극대화합니다.',
  },
  '마케팅 카피': {
    icon: Megaphone,
    description: '효과적인 마케팅 카피와 광고 문구를 생성합니다.',
  },
  '소셜미디어 콘텐츠': {
    icon: Share2,
    description: '소셜미디어용 콘텐츠를 생성하고 최적화합니다.',
  },
  '이메일 템플릿': {
    icon: Mail,
    description: '다양한 목적의 이메일 템플릿을 생성합니다.',
  },
  '블로그 포스트': {
    icon: Rss,
    description: '블로그 포스트를 자동으로 생성하고 편집합니다.',
  },
  '마케팅 콘텐츠': {
    icon: Megaphone,
    description: '마케팅 목적의 콘텐츠를 생성하고 최적화합니다.',
  },
  '브랜드 보이스': {
    icon: Mic,
    description: '브랜드 고유의 목소리와 톤을 일관되게 유지합니다.',
  },
  'SEO 최적화': {
    icon: TrendingUp,
    description: '검색 엔진 최적화를 위한 콘텐츠를 생성합니다.',
  },
  '템플릿 제공': {
    icon: FileText,
    description: '다양한 용도의 템플릿을 제공합니다.',
  },
  '표절 검사': {
    icon: Shield,
    description: '콘텐츠의 표절 여부를 검사합니다.',
  },
  'AI 아티클': {
    icon: FileText,
    description: 'AI를 활용하여 기사와 아티클을 생성합니다.',
  },
  랜딩페이지: {
    icon: PanelTop,
    description: '효과적인 랜딩페이지를 생성합니다.',
  },
  '광고 카피': {
    icon: Megaphone,
    description: '효과적인 광고 카피를 생성합니다.',
  },
  '회의록 자동 생성': {
    icon: FileText,
    description: '회의 내용을 자동으로 정리하여 회의록을 생성합니다.',
  },
  '실시간 전사': {
    icon: Mic,
    description: '음성을 실시간으로 텍스트로 변환합니다.',
  },
  요약: { icon: ScanText, description: '긴 텍스트를 간결하게 요약합니다.' },
  '키워드 하이라이트': {
    icon: Highlighter,
    description: '중요한 키워드를 하이라이트하여 표시합니다.',
  },
  '자동 요약': {
    icon: ScanText,
    description: '긴 문서를 자동으로 요약합니다.',
  },
  'AI 회의록': {
    icon: FileText,
    description: 'AI를 활용하여 회의록을 자동으로 생성합니다.',
  },
  '문법 교정': {
    icon: CheckCircle,
    description: '문법 오류를 찾아 수정합니다.',
  },
  '스타일 제안': {
    icon: PenTool,
    description: '글쓰기 스타일을 개선하는 제안을 제공합니다.',
  },
  'AI 글쓰기': {
    icon: PenTool,
    description: 'AI를 활용하여 다양한 글쓰기를 지원합니다.',
  },
  '실시간 피드백': {
    icon: MessageSquare,
    description: '작성 중인 텍스트에 실시간으로 피드백을 제공합니다.',
  },

  // 협업 및 팀 기능
  '팀 협업': {
    icon: Users,
    description: '팀원들과 효율적으로 협업할 수 있는 기능을 제공합니다.',
  },
  '실시간 협업': {
    icon: Users,
    description:
      '팀원들과 실시간으로 문서를 공유하고 동시에 편집할 수 있습니다.',
  },
  '팀 학습': {
    icon: GraduationCap,
    description: '팀 전체가 함께 학습하고 성장할 수 있는 기능을 제공합니다.',
  },
  협업: { icon: Users, description: '다양한 협업 도구와 기능을 제공합니다.' },

  // 디자인 및 개발 도구
  'AI 디자인': {
    icon: Palette,
    description: 'AI를 활용한 디자인 도구를 제공합니다.',
  },
  '마법 지우개': {
    icon: Eraser,
    description: '이미지에서 불필요한 부분을 자동으로 제거합니다.',
  },
  '브랜드 키트': {
    icon: Palette,
    description:
      '브랜드 아이덴티티를 일관되게 유지하는 디자인 키트를 제공합니다.',
  },
  '게임 아트': {
    icon: Gamepad2,
    description: '게임용 아트워크와 그래픽을 생성합니다.',
  },
  '실시간 캔버스': {
    icon: Palette,
    description: '실시간으로 그리고 편집할 수 있는 캔버스를 제공합니다.',
  },
  'AI 캔버스': {
    icon: Palette,
    description: 'AI 기능이 통합된 디지털 캔버스를 제공합니다.',
  },
  '3D 텍스처': { icon: Layers, description: '3D 모델용 텍스처를 생성합니다.' },
  애니메이션: {
    icon: Play,
    description: '다양한 애니메이션을 생성하고 편집합니다.',
  },
  'AI 웹 디자인': {
    icon: LayoutTemplate,
    description: 'AI를 활용한 웹 디자인 도구를 제공합니다.',
  },
  프로토타이핑: {
    icon: Layers,
    description: '빠른 프로토타입 개발을 지원합니다.',
  },
  '반응형 디자인': {
    icon: Monitor,
    description: '다양한 화면 크기에 대응하는 반응형 디자인을 생성합니다.',
  },
  '코드 내보내기': {
    icon: Download,
    description: '디자인을 실제 코드로 내보냅니다.',
  },
  '브라우저 IDE': {
    icon: Monitor,
    description: '웹 브라우저에서 작동하는 통합 개발 환경을 제공합니다.',
  },
  '코딩 지원': {
    icon: Code,
    description: 'AI를 활용한 코딩 지원 기능을 제공합니다.',
  },
  '자동 배포': {
    icon: Upload,
    description: '개발한 애플리케이션을 자동으로 배포합니다.',
  },
  '패키지 관리': {
    icon: Package,
    description: '프로젝트의 패키지와 의존성을 관리합니다.',
  },
  '데이터베이스 통합': {
    icon: Database,
    description: '데이터베이스와 연동하여 사용할 수 있습니다.',
  },
  '자연어 개발': {
    icon: MessageSquare,
    description: '자연어로 소프트웨어를 개발할 수 있습니다.',
  },
  '풀스택 생성': {
    icon: Layers,
    description: '풀스택 애플리케이션을 자동으로 생성합니다.',
  },
  '즉시 배포': {
    icon: Rocket,
    description: '개발한 애플리케이션을 즉시 배포합니다.',
  },
  'React 기반': {
    icon: Code,
    description: 'React 프레임워크를 기반으로 동작합니다.',
  },
  '풀스택 웹 개발': {
    icon: Globe,
    description: '풀스택 웹 개발을 지원합니다.',
  },
  '브라우저 기반 IDE': {
    icon: Monitor,
    description: '웹 브라우저에서 작동하는 개발 환경을 제공합니다.',
  },
  'AI 코딩 어시스턴트': {
    icon: Bot,
    description: 'AI 코딩 어시스턴트가 개발을 도와줍니다.',
  },
  'UI/UX 디자인': {
    icon: Layout,
    description: 'UI/UX 디자인 도구를 제공합니다.',
  },
  'AI 디자인 어시스턴트': {
    icon: Palette,
    description: 'AI 디자인 어시스턴트가 디자인을 도와줍니다.',
  },
  '로컬 AI': {
    icon: HardDrive,
    description: '로컬 환경에서 실행되는 AI 기능을 제공합니다.',
  },
  '프라이버시 보호': {
    icon: Shield,
    description: '사용자의 프라이버시를 보호합니다.',
  },
  '채팅 기능': {
    icon: MessageSquare,
    description: '실시간 채팅 기능을 제공합니다.',
  },
  '채팅 지원': {
    icon: MessageSquare,
    description: '챗봇과 채팅으로 상호작용할 수 있습니다.',
  },

  // 특수 기능 및 통합
  '무료 사용': {
    icon: Star,
    description: '무료로 사용할 수 있는 기능을 제공합니다.',
  },
  'API 접근': {
    icon: Link,
    description: 'API를 통해 외부 서비스와 연동할 수 있습니다.',
  },
  'API 제공': { icon: Link, description: '개발자를 위한 API를 제공합니다.' },
  '텍스트 렌더링': {
    icon: Type,
    description: '텍스트를 다양한 스타일로 렌더링합니다.',
  },
  '빠른 생성': { icon: Zap, description: '빠른 속도로 콘텐츠를 생성합니다.' },
  '매직 프롬프트': {
    icon: Wand2,
    description: '간단한 프롬프트로 복잡한 작업을 수행합니다.',
  },
  '이미지 remix': {
    icon: Shuffle,
    description: '기존 이미지를 새로운 스타일로 변환합니다.',
  },
  '개인 스타일': {
    icon: User,
    description: '개인의 스타일을 학습하고 적용합니다.',
  },
  'AI 아바타': { icon: User, description: '개인화된 AI 아바타를 생성합니다.' },
  '커스텀 아바타': {
    icon: UserCheck,
    description: '사용자 정의 아바타를 생성합니다.',
  },
  'PPT 통합': {
    icon: PlayCircle,
    description: 'PowerPoint와 연동하여 사용할 수 있습니다.',
  },
  'Adobe 통합': {
    icon: Layers,
    description: 'Adobe 제품과 연동하여 사용할 수 있습니다.',
  },
  '상업적 사용': {
    icon: Briefcase,
    description: '상업적 목적으로 사용할 수 있습니다.',
  },
  '텍스트 효과': {
    icon: Sparkles,
    description: '텍스트에 다양한 효과를 적용합니다.',
  },
  '벡터 생성': { icon: Shapes, description: '벡터 그래픽을 생성합니다.' },
  '브러시 생성': {
    icon: Brush,
    description: '사용자 정의 브러시를 생성합니다.',
  },
  '다양한 스타일': {
    icon: Palette,
    description: '다양한 스타일을 지원합니다.',
  },
  고해상도: { icon: Maximize, description: '고해상도 이미지를 생성합니다.' },
  커스터마이징: {
    icon: Settings,
    description: '사용자의 요구에 맞게 커스터마이징할 수 있습니다.',
  },
  'AI 스크립트': {
    icon: FileText,
    description: 'AI를 활용한 스크립트를 생성합니다.',
  },
  '템플릿 5000+': {
    icon: FileText,
    description: '5000개 이상의 템플릿을 제공합니다.',
  },
  '텍스트-비디오 변환': {
    icon: Video,
    description: '텍스트를 비디오로 변환합니다.',
  },
  '고품질 영상': { icon: Video, description: '고품질의 영상을 생성합니다.' },
  '긴 영상 생성': {
    icon: Video,
    description: '긴 길이의 영상을 생성할 수 있습니다.',
  },
  '현실적 표현': { icon: Eye, description: '현실적인 표현을 구현합니다.' },
  'AI 프레젠테이션': {
    icon: PlayCircle,
    description: 'AI를 활용한 프레젠테이션을 생성합니다.',
  },
  '자동 레이아웃': {
    icon: Layout,
    description: '자동으로 최적화된 레이아웃을 생성합니다.',
  },
  '디자인 템플릿': {
    icon: FileText,
    description: '다양한 디자인 템플릿을 제공합니다.',
  },
  '웹사이트 생성': {
    icon: Globe,
    description: '웹사이트를 자동으로 생성합니다.',
  },
  '자동 하이라이트': {
    icon: Highlighter,
    description: '중요한 부분을 자동으로 하이라이트합니다.',
  },
  'AI 음성': { icon: Mic, description: 'AI 음성을 활용한 기능을 제공합니다.' },
  '스톡 라이브러리': {
    icon: Image,
    description: '다양한 스톡 이미지와 영상을 제공합니다.',
  },
  'AI 비디오 편집': {
    icon: Video,
    description: 'AI를 활용한 비디오 편집 기능을 제공합니다.',
  },
  템플릿: { icon: FileText, description: '다양한 템플릿을 제공합니다.' },
  '유머 대화': {
    icon: MessageSquare,
    description: '유머러스한 대화를 나눌 수 있습니다.',
  },
  'X 플랫폼 통합': {
    icon: Share2,
    description: 'X(구 트위터) 플랫폼과 연동됩니다.',
  },
  '다중 AI 모델': {
    icon: Brain,
    description: '여러 AI 모델을 동시에 활용할 수 있습니다.',
  },
  'Claude, GPT-4 접근': {
    icon: Brain,
    description: 'Claude와 GPT-4 모델에 접근할 수 있습니다.',
  },
  '커스텀 봇': {
    icon: Bot,
    description: '사용자 정의 봇을 생성할 수 있습니다.',
  },

  // 시스템 통합 및 업무 자동화
  'Office 통합': {
    icon: Briefcase,
    description: 'Microsoft Office 제품과 연동하여 사용할 수 있습니다.',
  },
  'Windows 통합': {
    icon: Monitor,
    description: 'Windows 운영체제와 통합되어 사용할 수 있습니다.',
  },
  '업무 자동화': {
    icon: Workflow,
    description: '반복적인 업무를 자동화합니다.',
  },
  'Google 서비스 통합': {
    icon: Search,
    description: 'Google 서비스와 연동하여 사용할 수 있습니다.',
  },
  '멀티모달 AI': {
    icon: Brain,
    description: '텍스트, 이미지, 음성을 동시에 처리할 수 있습니다.',
  },
  '이미지 분석': {
    icon: Eye,
    description: '이미지를 분석하고 인사이트를 제공합니다.',
  },
  'Notion 통합': {
    icon: FileText,
    description: 'Notion과 연동하여 사용할 수 있습니다.',
  },

  // 특수 AI 기능
  '안전한 AI': {
    icon: Shield,
    description: '안전하고 신뢰할 수 있는 AI 기능을 제공합니다.',
  },
  '긴 문맥 처리': {
    icon: FileText,
    description: '긴 문맥을 이해하고 처리할 수 있습니다.',
  },
  '문서 분석': {
    icon: FileText,
    description: '문서를 분석하고 인사이트를 제공합니다.',
  },
  '다국어 지원': { icon: Languages, description: '다양한 언어를 지원합니다.' },
  '패턴 인식': {
    icon: Eye,
    description: '데이터에서 패턴을 인식하고 분석합니다.',
  },
  딥러닝: {
    icon: BrainCircuit,
    description: '딥러닝 기술을 활용한 고급 AI 기능을 제공합니다.',
  },
};

// 기본 아이콘과 설명 (매핑되지 않은 기능에 사용)
export const defaultFeatureData = {
  icon: Sparkles,
  description: '이 기능을 통해 더욱 효율적인 작업이 가능합니다.',
};

// 기능명으로 아이콘과 설명을 가져오는 함수
export function getFeatureData(featureName: string): {
  icon: LucideIcon;
  description: string;
} {
  // 정확히 일치하는 기능명 검색
  if (featureData[featureName]) {
    return featureData[featureName];
  }

  // 기본값으로 폴백

  return defaultFeatureData;
}

// 기능명으로 아이콘만 가져오는 함수 (기존 호환성 유지)
export function getFeatureIcon(featureName: string): LucideIcon {
  return getFeatureData(featureName).icon;
}
