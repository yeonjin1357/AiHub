-- Canva AI 2025년 업데이트 및 뉴스 추가
-- 먼저 기존 Canva 업데이트 삭제
DELETE FROM service_updates 
WHERE service_id = (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1);

-- Canva 업데이트 데이터 삽입
INSERT INTO service_updates (service_id, title, description, content, link_url, source, source_name, published_at) VALUES
-- 2025년 1월 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'New Job 2025: 미래의 일자리를 위한 디자인 스킬',
  '2025년 변화하는 직업 시장에서 필요한 디자인 스킬과 Canva를 활용한 경력 개발 방법을 소개합니다.',
  '디지털 시대의 새로운 직업들은 디자인 스킬을 필수로 요구합니다. Canva는 비디자이너들도 전문가 수준의 디자인을 만들 수 있도록 지원하며, AI 기능을 통해 더욱 빠르고 효율적인 작업이 가능합니다.',
  'https://www.canva.com/newsroom/news/new-job-2025/',
  'news',
  'Canva Newsroom',
  '2025-01-15T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '2025 글로벌 디자인 트렌드 보고서',
  'Canva가 발표한 2025년 국제 디자인 트렌드와 창의적인 표현의 미래를 예측합니다.',
  '전 세계 디자이너들의 작업을 분석하여 도출한 2025년 주요 디자인 트렌드를 공개합니다. AI와 인간의 창의성이 조화를 이루는 새로운 디자인 패러다임이 주목받고 있습니다.',
  'https://www.canva.com/newsroom/news/international-trends-2025/',
  'news',
  'Canva Newsroom',
  '2025-01-10T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '인터랙티브 학습 기능 출시',
  'Canva가 교육자와 학생들을 위한 새로운 인터랙티브 학습 도구를 선보입니다.',
  '실시간 협업, 퀴즈, 프레젠테이션 도구가 통합된 인터랙티브 학습 플랫폼을 출시했습니다. 교사들은 더욱 몰입도 높은 수업을 만들고, 학생들은 창의적으로 학습할 수 있습니다.',
  'https://www.canva.com/newsroom/news/interactive-learning-launch/',
  'news',
  'Canva Newsroom',
  '2025-01-08T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '고등교육 디지털 전환 보고서',
  '대학과 고등교육 기관에서 Canva를 활용한 디지털 전환 사례와 성과를 분석한 보고서입니다.',
  '전 세계 500개 이상의 대학에서 Canva를 교육 도구로 채택하며, 학생들의 디지털 리터러시와 창의성이 크게 향상되었습니다.',
  'https://www.canva.com/newsroom/news/higher-education-report/',
  'news',
  'Canva Newsroom',
  '2025-01-05T00:00:00Z'
),

-- 2024년 12월 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'DocuSign 통합으로 영업팀 워크플로우 혁신',
  'Canva와 DocuSign의 통합으로 영업 자료 제작부터 계약까지 원스톱 솔루션을 제공합니다.',
  '영업 제안서를 Canva에서 디자인하고 DocuSign으로 바로 전자 서명을 받을 수 있습니다. 이를 통해 영업 사이클이 40% 단축되었습니다.',
  'https://www.canva.com/newsroom/news/sales-teams-docusign/',
  'news',
  'Canva Newsroom',
  '2024-12-20T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva 도입 기업들의 ROI 사례 연구',
  '글로벌 기업들이 Canva를 도입하여 달성한 투자 대비 수익률과 생산성 향상 사례를 공개합니다.',
  'Fortune 500 기업들이 Canva를 도입한 후 평균 3배의 ROI를 달성했으며, 디자인 작업 시간은 80% 단축되었습니다.',
  'https://www.canva.com/newsroom/news/roi-canva-case-studies/',
  'news',
  'Canva Newsroom',
  '2024-12-15T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '2025년을 위한 마케팅 해킹 가이드',
  'AI와 자동화를 활용한 차세대 마케팅 전략과 Canva의 새로운 마케팅 도구를 소개합니다.',
  'Magic Write, Brand Kit, Content Planner 등 Canva의 AI 기반 마케팅 도구로 콘텐츠 제작 속도를 10배 향상시킬 수 있습니다.',
  'https://www.canva.com/newsroom/news/marketing-hacks/',
  'news',
  'Canva Newsroom',
  '2024-12-10T00:00:00Z'
),

-- 2025년 2월 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva 2월 신기능 업데이트',
  '2월에 추가된 새로운 AI 기능, 템플릿, 통합 기능을 한눈에 확인하세요.',
  'Magic Eraser 개선, 새로운 비디오 효과, 3D 디자인 도구 등 창의성을 극대화하는 기능들이 추가되었습니다.',
  'https://www.canva.com/newsroom/news/whats-new-february/',
  'news',
  'Canva Newsroom',
  '2025-02-01T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '2025 새학기 준비 가이드',
  '교사와 학생들을 위한 새학기 준비 팁과 Canva의 교육용 템플릿을 소개합니다.',
  '수업 계획표, 시간표, 발표 자료 등 새학기에 필요한 모든 교육 자료를 Canva에서 제작할 수 있습니다.',
  'https://www.canva.com/newsroom/news/kickstart-school-year-tips-tools-2025/',
  'news',
  'Canva Newsroom',
  '2025-02-15T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '교사를 위한 Canva AI 자격증 프로그램',
  '교육자들이 AI 도구를 효과적으로 활용할 수 있도록 돕는 전문 자격증 과정을 출시했습니다.',
  'AI 기반 교육 콘텐츠 제작, 학생 참여 증진, 개인화된 학습 경험 설계 등을 다루는 종합 교육 프로그램입니다.',
  'https://www.canva.com/newsroom/news/teacher-canva-ai-certification/',
  'news',
  'Canva Newsroom',
  '2025-02-20T00:00:00Z'
),

-- 2025년 3월 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '주목 경제 시대의 디자인 전략 웨비나',
  '짧은 주목 시간 속에서 메시지를 효과적으로 전달하는 비주얼 커뮤니케이션 전략을 공유합니다.',
  '평균 8초의 주목 시간 내에 핵심 메시지를 전달하는 디자인 기법과 Canva AI 도구 활용법을 소개합니다.',
  'https://www.canva.com/newsroom/news/attention-economy-webinar/',
  'news',
  'Canva Newsroom',
  '2025-03-05T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva Create 2025 컨퍼런스 개최 발표',
  '올해 가장 큰 디자인 & 창의성 컨퍼런스 Canva Create가 돌아옵니다.',
  '전 세계 크리에이터, 디자이너, 마케터가 모이는 Canva Create 2025가 5월에 개최됩니다. AI와 창의성의 미래를 탐구합니다.',
  'https://www.canva.com/newsroom/news/canva-create-is-back/',
  'news',
  'Canva Newsroom',
  '2025-03-01T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'HubSpot 통합 기능 출시',
  'Canva와 HubSpot의 강력한 통합으로 마케팅 자동화와 디자인 워크플로우를 하나로 연결합니다.',
  'HubSpot CRM에서 바로 Canva 디자인을 생성하고 관리할 수 있으며, 캠페인 성과 데이터를 기반으로 디자인을 최적화할 수 있습니다.',
  'https://www.canva.com/newsroom/news/hubspot-integration/',
  'news',
  'Canva Newsroom',
  '2025-03-10T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '샌프란시스코 신규 캠퍼스 오픈',
  'Canva가 샌프란시스코에 새로운 혁신 캠퍼스를 열고 AI 연구 개발을 가속화합니다.',
  '실리콘밸리 중심부에 위치한 새 캠퍼스는 500명 이상의 엔지니어와 디자이너가 근무하며, AI 연구에 집중합니다.',
  'https://www.canva.com/newsroom/news/san-francisco-campus/',
  'news',
  'Canva Newsroom',
  '2025-03-15T00:00:00Z'
),

-- 2025년 4월 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '마케팅 AI 활용 현황 보고서',
  '전 세계 마케터들의 AI 도구 활용 현황과 Canva AI가 마케팅 성과에 미치는 영향을 분석했습니다.',
  '마케터의 87%가 AI 도구를 일상적으로 사용하며, Canva AI 사용자는 콘텐츠 제작 시간을 평균 75% 단축했습니다.',
  'https://www.canva.com/newsroom/news/marketing-ai-report/',
  'news',
  'Canva Newsroom',
  '2025-04-20T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Love Your Work 캠페인 시작',
  '일과 창의성의 균형을 찾고 업무에서 즐거움을 발견하는 방법을 제시하는 글로벌 캠페인입니다.',
  'Canva의 도구로 지루한 업무를 창의적인 프로젝트로 변화시키고, 팀워크와 협업의 즐거움을 재발견하세요.',
  'https://www.canva.com/newsroom/news/love-your-work/',
  'news',
  'Canva Newsroom',
  '2025-04-15T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '라마단 특별 컬렉션 출시',
  '라마단을 맞아 이슬람 문화권 사용자들을 위한 특별 템플릿과 디자인 요소를 선보입니다.',
  '전통적인 이슬람 패턴, 아랍어 캘리그래피, 라마단 인사말 카드 등 문화적 감수성을 반영한 디자인 리소스입니다.',
  'https://www.canva.com/newsroom/news/ramadan-collection/',
  'news',
  'Canva Newsroom',
  '2025-04-10T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva for Sales 웨비나 시리즈',
  '영업팀의 성과를 높이는 Canva 활용 전략과 성공 사례를 공유하는 웨비나 시리즈입니다.',
  '제안서 디자인, 프레젠테이션 기법, 소셜 셀링 콘텐츠 제작 등 영업 전 과정에서 Canva를 활용하는 방법을 다룹니다.',
  'https://www.canva.com/newsroom/news/canva-for-sales-webinar/',
  'news',
  'Canva Newsroom',
  '2025-04-05T00:00:00Z'
),

-- 2025년 5월 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'AI 기반 교실 활동 도구 출시',
  '학생 참여를 높이는 AI 기반 인터랙티브 교실 활동 도구를 선보입니다.',
  'AI가 학생들의 학습 스타일을 분석하여 개인화된 활동을 제안하고, 실시간 피드백을 제공합니다.',
  'https://www.canva.com/newsroom/news/ai-classroom-activities/',
  'news',
  'Canva Newsroom',
  '2025-05-25T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '스페인 교사의 날 특별 이벤트',
  '스페인과 라틴 아메리카 교육자들을 위한 특별 프로그램과 리소스를 제공합니다.',
  '교사들에게 Canva Pro를 무료로 제공하고, 스페인어 교육 자료와 웨비나를 진행합니다.',
  'https://www.canva.com/newsroom/news/teachers-day-spain/',
  'news',
  'Canva Newsroom',
  '2025-05-20T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '유럽 시장 성장 및 투자 확대',
  'Canva가 유럽 시장에서의 성장을 가속화하고 현지 팀을 대폭 확충합니다.',
  '런던, 베를린, 파리에 새로운 오피스를 열고, 유럽 사용자를 위한 현지화된 기능과 콘텐츠를 강화합니다.',
  'https://www.canva.com/newsroom/news/europe-growth/',
  'news',
  'Canva Newsroom',
  '2025-05-15T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva Design School 런칭',
  '디자인 초보자부터 전문가까지 모든 수준의 학습자를 위한 온라인 디자인 교육 플랫폼입니다.',
  '무료로 제공되는 수백 개의 디자인 강좌와 AI 활용 튜토리얼로 누구나 디자인 전문가가 될 수 있습니다.',
  'https://www.canva.com/newsroom/news/canva-design-school/',
  'news',
  'Canva Newsroom',
  '2025-05-10T00:00:00Z'
),

-- Canva Create 2025 관련
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva Create 2025 공식 개최',
  '올해 가장 큰 창의성 축제 Canva Create 2025가 성황리에 개최되었습니다.',
  '3일간 진행된 컨퍼런스에서 AI의 미래, 디자인 혁신, 협업의 새로운 패러다임이 제시되었습니다.',
  'https://www.canva.com/newsroom/news/canva-create-2025/',
  'news',
  'Canva Newsroom',
  '2025-05-05T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva Create 2025 주요 발표 정리',
  'Canva Create에서 발표된 혁신적인 신기능과 파트너십을 한눈에 정리합니다.',
  'Magic Studio 2.0, AI Video Editor, 3D Design Tools 등 게임체인징 기능들이 대거 발표되었습니다.',
  'https://www.canva.com/newsroom/news/what-happened-at-canva-create-2025/',
  'news',
  'Canva Newsroom',
  '2025-05-08T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '온라인 비즈니스를 위한 Canva 활용 웨비나',
  '이커머스와 온라인 비즈니스 운영자를 위한 Canva 마스터클래스입니다.',
  '제품 사진 편집, 소셜 미디어 광고, 이메일 마케팅 디자인 등 온라인 비즈니스 성공을 위한 모든 것을 다룹니다.',
  'https://www.canva.com/newsroom/news/canva-online-business-webinar/',
  'news',
  'Canva Newsroom',
  '2025-05-01T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva Create AI 세션 하이라이트',
  'AI 전문가들이 말하는 창의성과 AI의 공존, 그리고 미래 전망을 정리했습니다.',
  'OpenAI, Google, Meta의 AI 리더들이 참여하여 생성형 AI와 디자인의 미래를 논의했습니다.',
  'https://www.canva.com/newsroom/news/canva-create-ai-sessions/',
  'news',
  'Canva Newsroom',
  '2025-05-06T00:00:00Z'
),

-- 2025년 6월 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '고등교육 기관을 위한 Canva 솔루션',
  '대학과 연구기관을 위한 맞춤형 Canva 교육 패키지를 출시했습니다.',
  '학술 포스터, 연구 발표, 논문 인포그래픽 등 학술 커뮤니케이션을 위한 전문 템플릿과 도구를 제공합니다.',
  'https://www.canva.com/newsroom/news/higher-education/',
  'news',
  'Canva Newsroom',
  '2025-06-20T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva Create 신기능 상세 소개',
  'Canva Create에서 발표된 새로운 기능들의 상세한 사용법과 활용 사례를 소개합니다.',
  'Brand Voice AI, Magic Resize 2.0, Collaborative Whiteboard 등 업무 효율을 극대화하는 신기능들입니다.',
  'https://www.canva.com/newsroom/news/canva-create-whats-new/',
  'news',
  'Canva Newsroom',
  '2025-06-15T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'CMO들이 예측하는 2025 마케팅 트렌드',
  'Canva Create에 참여한 글로벌 CMO들이 전망하는 마케팅의 미래입니다.',
  'AI 기반 개인화, 실시간 콘텐츠 생성, 멀티모달 캠페인이 2025년 마케팅의 핵심 트렌드로 부상합니다.',
  'https://www.canva.com/newsroom/news/canva-create-cmo-predictions/',
  'news',
  'Canva Newsroom',
  '2025-06-10T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva AI 대규모 업데이트',
  'Magic Write, Magic Edit, Magic Design 등 Canva AI 스위트의 대대적인 성능 개선이 이루어졌습니다.',
  '처리 속도 3배 향상, 다국어 지원 확대, 컨텍스트 이해력 강화로 더욱 똑똑해진 AI 어시스턴트를 만나보세요.',
  'https://www.canva.com/newsroom/news/canva-ai-launches/',
  'news',
  'Canva Newsroom',
  '2025-06-05T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva Sheets 출시 - 스프레드시트의 재발명',
  '데이터 시각화와 스프레드시트 기능을 결합한 혁신적인 Canva Sheets를 소개합니다.',
  '엑셀 데이터를 아름다운 차트와 인포그래픽으로 자동 변환하고, 실시간 협업이 가능한 차세대 스프레드시트입니다.',
  'https://www.canva.com/newsroom/news/introducing-canva-sheets/',
  'news',
  'Canva Newsroom',
  '2025-06-01T00:00:00Z'
),

-- 2025년 7월 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '비디자이너를 위한 디자인 민주화',
  '전문 디자인 지식 없이도 누구나 멋진 디자인을 만들 수 있는 Canva의 철학과 도구를 소개합니다.',
  'AI 어시스턴트가 디자인 원칙을 자동 적용하여, 디자인 교육을 받지 않은 사용자도 전문가 수준의 결과물을 만들 수 있습니다.',
  'https://www.canva.com/newsroom/news/empowering-non-designers/',
  'news',
  'Canva Newsroom',
  '2025-07-25T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'LinkedIn Ads 앱 통합',
  'Canva에서 직접 LinkedIn 광고를 디자인하고 게시할 수 있는 통합 기능을 출시했습니다.',
  'B2B 마케터들이 Canva에서 LinkedIn 광고 캠페인을 end-to-end로 관리할 수 있으며, 성과 분석도 가능합니다.',
  'https://www.canva.com/newsroom/news/linkedin-ads-app/',
  'news',
  'Canva Newsroom',
  '2025-07-20T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '일본 시장 특별 업데이트',
  '일본 사용자들을 위한 현지화 기능과 일본 문화를 반영한 디자인 요소들을 대거 추가했습니다.',
  '일본어 폰트 확대, 전통 문양, 비즈니스 명함 템플릿 등 일본 시장 맞춤형 콘텐츠를 제공합니다.',
  'https://www.canva.com/newsroom/news/whats-new-in-japan/',
  'news',
  'Canva Newsroom',
  '2025-07-15T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'CBS와 전략적 파트너십 체결',
  '미디어 거대 기업 CBS와 콘텐츠 제작 및 배포 파트너십을 맺었습니다.',
  'CBS의 방대한 미디어 라이브러리와 Canva의 디자인 도구가 결합하여 새로운 콘텐츠 제작 생태계를 구축합니다.',
  'https://www.canva.com/newsroom/news/cbs-partnership/',
  'news',
  'Canva Newsroom',
  '2025-07-10T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Flourish 인수로 데이터 저널리즘 강화',
  '데이터 시각화 전문 플랫폼 Flourish를 인수하여 Canva의 데이터 스토리텔링 역량을 강화했습니다.',
  '저널리스트와 데이터 분석가들이 복잡한 데이터를 아름답고 인터랙티브한 시각화로 전환할 수 있습니다.',
  'https://www.canva.com/newsroom/news/canva-flourish-for-journalists/',
  'news',
  'Canva Newsroom',
  '2025-07-05T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva Create 2025 교육 세션 하이라이트',
  '교육자들을 위한 특별 세션에서 발표된 혁신적인 교육 도구와 방법론을 정리했습니다.',
  'AI 튜터, 적응형 학습 콘텐츠, 학생 포트폴리오 시스템 등 미래 교육을 위한 도구들이 소개되었습니다.',
  'https://www.canva.com/newsroom/news/canva-create-2025-education/',
  'news',
  'Canva Newsroom',
  '2025-07-01T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '7월 신기능 업데이트 종합',
  '2025년 7월에 추가된 모든 새로운 기능과 개선사항을 한눈에 확인하세요.',
  'AI Background Remover 고도화, 4K 비디오 편집, 실시간 번역 기능 등 생산성을 높이는 업데이트가 가득합니다.',
  'https://www.canva.com/newsroom/news/whats-new-july-2025/',
  'news',
  'Canva Newsroom',
  '2025-07-30T00:00:00Z'
),

-- 추가 업데이트들
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '1000만 그루 나무 심기 프로젝트 달성',
  'Canva의 지속가능성 이니셔티브로 전 세계에 1000만 그루의 나무를 심는 목표를 달성했습니다.',
  '사용자들이 디자인을 만들 때마다 나무를 심는 프로그램을 통해 환경 보호에 기여하고 있습니다.',
  'https://www.canva.com/newsroom/news/10-million-trees/',
  'news',
  'Canva Newsroom',
  '2025-06-25T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'HubSpot과 AI 마케팅 웨비나',
  'HubSpot과 Canva가 공동 주최하는 AI 기반 마케팅 자동화 웨비나입니다.',
  'AI를 활용한 콘텐츠 생성, A/B 테스팅, 성과 최적화 등 차세대 마케팅 전략을 다룹니다.',
  'https://www.canva.com/newsroom/news/hubspot-ai-webinar/',
  'news',
  'Canva Newsroom',
  '2025-06-18T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '데이터 스토리텔링 트렌드 보고서',
  '데이터 시각화와 스토리텔링의 최신 트렌드를 분석한 종합 보고서를 발표했습니다.',
  '인포그래픽, 대시보드, 데이터 애니메이션 등 효과적인 데이터 커뮤니케이션 방법을 제시합니다.',
  'https://www.canva.com/newsroom/news/data-storytelling-report/',
  'news',
  'Canva Newsroom',
  '2025-06-12T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'CNBC Disruptor 50 선정',
  'Canva가 CNBC Disruptor 50 2025 리스트에서 상위권에 선정되었습니다.',
  'AI 혁신과 디자인 민주화로 전통적인 소프트웨어 산업을 혁신한 공로를 인정받았습니다.',
  'https://www.canva.com/newsroom/news/cnbc-disruptor-50-2025/',
  'news',
  'Canva Newsroom',
  '2025-05-28T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '정부 기관을 위한 Canva 솔루션',
  '공공 부문의 커뮤니케이션을 개선하는 정부 기관 전용 Canva 패키지를 출시했습니다.',
  '보안 강화, 접근성 준수, 공공 캠페인 템플릿 등 정부 기관의 특수한 요구사항을 충족합니다.',
  'https://www.canva.com/newsroom/news/canva-for-government-agencies/',
  'news',
  'Canva Newsroom',
  '2025-05-22T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva Enterprise 1주년 성과',
  '엔터프라이즈 버전 출시 1년, 포춘 500 기업의 80%가 Canva를 도입했습니다.',
  '기업용 보안, 브랜드 관리, 팀 협업 기능으로 대기업의 디자인 워크플로우를 혁신했습니다.',
  'https://www.canva.com/newsroom/news/one-year-canva-enterprise/',
  'news',
  'Canva Newsroom',
  '2025-05-18T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '마케팅 AI 활용 마스터클래스',
  'AI를 활용한 마케팅 전략 수립부터 실행까지 다루는 심화 웨비나 시리즈입니다.',
  'Predictive Analytics, Dynamic Content Generation, AI-powered Personalization 등을 실습합니다.',
  'https://www.canva.com/newsroom/news/marketing-ai-webinar/',
  'news',
  'Canva Newsroom',
  '2025-05-12T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'VivaTech 2025 주요 발표',
  '유럽 최대 테크 컨퍼런스 VivaTech에서 Canva가 발표한 혁신 기술을 정리했습니다.',
  'EU AI Act 준수, GDPR 강화, 유럽 시장 특화 기능 등을 발표했습니다.',
  'https://www.canva.com/newsroom/news/vivatech-takeaways/',
  'news',
  'Canva Newsroom',
  '2025-06-08T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'MagicBrief 인수로 광고 제작 역량 강화',
  '광고 크리에이티브 분석 플랫폼 MagicBrief를 인수하여 광고 제작 생태계를 확장했습니다.',
  '경쟁사 광고 분석, 트렌드 예측, 성과 기반 크리에이티브 추천 등의 기능이 Canva에 통합됩니다.',
  'https://www.canva.com/newsroom/news/magicbrief-acquisition/',
  'news',
  'Canva Newsroom',
  '2025-06-30T00:00:00Z'
),

-- 최신 AI 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Google Veo3 통합으로 AI 비디오 혁신',
  'Google의 최신 비디오 AI 모델 Veo3를 Canva에 통합하여 차세대 비디오 제작이 가능해졌습니다.',
  '텍스트로 고품질 비디오 생성, 스타일 전환, 객체 추적 및 편집 등 프로급 비디오 제작이 클릭 몇 번으로 가능합니다.',
  'https://www.canva.com/newsroom/news/veo3-canva-ai-video/',
  'news',
  'Canva Newsroom',
  '2025-07-18T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Deep Research와 MCP 서버 통합',
  '고급 연구 및 분석을 위한 Deep Research 기능과 MCP(Model Context Protocol) 서버 통합을 발표했습니다.',
  'AI가 복잡한 주제를 심층 연구하고, 신뢰할 수 있는 출처에서 정보를 수집하여 종합적인 콘텐츠를 생성합니다.',
  'https://www.canva.com/newsroom/news/deep-research-integration-mcp-server/',
  'news',
  'Canva Newsroom',
  '2025-07-22T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'AI 리터러시 교육 프로그램',
  '모든 사용자가 AI를 책임감 있게 활용할 수 있도록 돕는 AI 리터러시 교육 프로그램을 시작했습니다.',
  'AI의 작동 원리, 윤리적 사용, 한계와 가능성 등을 다루는 무료 온라인 과정을 제공합니다.',
  'https://www.canva.com/newsroom/news/ai-literacy/',
  'news',
  'Canva Newsroom',
  '2025-07-12T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Canva Weddings 전문 플랫폼 출시',
  '결혼 준비의 모든 디자인을 한 곳에서 해결하는 웨딩 전문 플랫폼을 선보입니다.',
  '청첩장, 좌석 배치도, 감사 카드, 웨딩 비디오 등 결혼식에 필요한 모든 디자인 솔루션을 제공합니다.',
  'https://www.canva.com/newsroom/news/canva-weddings/',
  'news',
  'Canva Newsroom',
  '2025-06-28T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'AI 생성 콘텐츠 소유권 정책 발표',
  'AI로 생성한 콘텐츠의 소유권과 사용 권리에 대한 명확한 가이드라인을 발표했습니다.',
  '사용자가 Canva AI로 만든 모든 콘텐츠의 완전한 소유권을 보장하며, 상업적 사용도 자유롭게 할 수 있습니다.',
  'https://www.canva.com/newsroom/news/content-ownership/',
  'news',
  'Canva Newsroom',
  '2025-07-08T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '새로운 API와 데이터 커넥터 출시',
  '개발자들을 위한 강력한 API v3와 엔터프라이즈 데이터 커넥터를 공개했습니다.',
  'Salesforce, SAP, Oracle 등 주요 엔터프라이즈 시스템과 실시간 데이터 연동이 가능해졌습니다.',
  'https://www.canva.com/newsroom/news/new-apis-data-connectors/',
  'news',
  'Canva Newsroom',
  '2025-06-22T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  '스페인어권 팀 협업 보고서',
  '라틴 아메리카와 스페인의 팀들이 Canva를 활용한 협업 사례와 성과를 분석했습니다.',
  '원격 근무 환경에서 Canva를 통한 협업으로 생산성이 65% 향상되었습니다.',
  'https://www.canva.com/newsroom/news/informe-de-equipos/',
  'news',
  'Canva Newsroom',
  '2025-05-30T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'AI Discovery Week 특별 이벤트',
  'AI의 가능성을 탐구하는 일주일간의 온라인 이벤트를 개최합니다.',
  '매일 새로운 AI 기능 공개, 전문가 웨비나, 사용자 챌린지 등 다양한 프로그램이 진행됩니다.',
  'https://www.canva.com/newsroom/news/ai-discovery-week/',
  'news',
  'Canva Newsroom',
  '2025-07-28T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%Canva%' LIMIT 1),
  'Meta 광고 최적화 웨비나',
  'Facebook과 Instagram 광고를 Canva에서 제작하고 최적화하는 방법을 다루는 전문 웨비나입니다.',
  'Meta의 광고 알고리즘에 최적화된 크리에이티브 제작 팁과 A/B 테스팅 전략을 공유합니다.',
  'https://www.canva.com/newsroom/news/meta-ads-webinar/',
  'news',
  'Canva Newsroom',
  '2025-04-25T00:00:00Z'
);

-- 확인 쿼리
SELECT 
  title,
  source_name,
  published_at,
  link_url
FROM service_updates u
JOIN ai_services s ON u.service_id = s.id
WHERE s.name ILIKE '%Canva%'
ORDER BY u.published_at DESC;