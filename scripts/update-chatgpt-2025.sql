-- ChatGPT 2025년 5월~7월 최신 업데이트 데이터로 교체
-- 기존 ChatGPT 업데이트 데이터를 삭제하고 최신 데이터로 교체합니다

-- 기존 ChatGPT 업데이트 데이터 삭제
DELETE FROM service_updates 
WHERE service_id = (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1);

-- 2025년 5월~7월 ChatGPT 최신 업데이트 데이터 삽입
INSERT INTO service_updates (service_id, title, description, content, link_url, source, source_name, published_at) VALUES
-- 2025년 7월 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'ChatGPT Agent 출시 - AI가 직접 작업 수행',
  'ChatGPT가 이제 생각하고 행동할 수 있습니다. 도구함에서 에이전트 기능을 선택하여 컴퓨터를 사용해 작업을 완료합니다.',
  'ChatGPT Agent는 자체 컴퓨터에 액세스하여 터미널에서 코드 작성, ChatGPT API 사용 등 다양한 작업을 수행할 수 있습니다. 작업 중 언제든지 중단하여 지시사항을 명확히 하거나 작업을 변경할 수 있으며, 이전 진행상황을 잃지 않고 새로운 정보로 계속 진행됩니다.',
  'https://openai.com/index/introducing-chatgpt-agent/',
  'official',
  'OpenAI',
  '2025-07-17T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'Study Together 기능 추가',
  '일부 ChatGPT 사용자에게 "Study Together" 새 기능이 도구 목록에 나타나고 있습니다.',
  '학습을 위한 새로운 협업 기능으로, 사용자들이 함께 학습할 수 있는 환경을 제공합니다.',
  'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
  'official',
  'OpenAI Help Center',
  '2025-07-15T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'AI 웹 브라우저 개발 계획 발표',
  'OpenAI가 구글 크롬에 도전하는 AI 기반 웹 브라우저 출시를 계획한다고 발표했습니다.',
  '이 브라우저는 사용자를 외부 웹사이트로 보내지 않고 ChatGPT 내에서 일부 사용자 상호작용을 유지할 예정입니다.',
  'https://techcrunch.com/2025/07/16/chatgpt-everything-to-know-about-the-ai-chatbot/',
  'news',
  'TechCrunch',
  '2025-07-16T00:00:00Z'
),

-- 2025년 6월 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'o3-pro 모델 출시',
  'ChatGPT Pro 및 Team 사용자를 위한 향상된 추론 모델 o3-pro가 출시되었습니다.',
  'o3-pro는 올해 초 출시된 o3의 향상된 버전으로, ChatGPT와 API에서 사용할 수 있습니다. Enterprise 및 Edu 사용자는 6월 셋째 주에 액세스할 수 있습니다. o3-pro는 모델 선택기에서 OpenAI o1-pro를 대체합니다.',
  'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
  'official',
  'OpenAI Help Center',
  '2025-06-10T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'Advanced Voice 기능 대폭 개선',
  '유료 사용자를 위한 Advanced Voice가 억양과 자연스러움에서 상당한 개선을 이뤘습니다.',
  '더 자연스럽고 표현력 있는 소리로 상호작용이 더 유창하고 인간적으로 느껴집니다. 미묘한 억양, 현실적인 리듬(일시정지와 강조 포함), 공감, 냉소 등 특정 감정에 대한 더 정확한 표현력을 제공합니다.',
  'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
  'official',
  'OpenAI Help Center',
  '2025-06-07T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'Advanced Voice 무료 사용자 확대',
  '6월 7일에 발표된 Advanced Voice 업그레이드가 이제 ChatGPT 무료 사용자에게도 출시됩니다.',
  '유료 사용자와 동일한 개선사항으로 ChatGPT가 더 자연스럽고 표현력 있게 들리며, 더 효과적으로 번역할 수 있습니다.',
  'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
  'official',
  'OpenAI Help Center',
  '2025-06-07T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'ChatGPT 비즈니스 플랜 업데이트',
  '내부 도구 연결, MCP를 통한 사용자 정의 연결, ChatGPT 레코드 모드, 유연한 가격 책정이 추가되었습니다.',
  'Record 모드가 macOS 데스크톱 앱에서 ChatGPT Plus 사용자에게 전 세계적으로 제공됩니다. 팀 회의나 음성 메모와 같은 실시간 대화를 녹음하고 캔버스에서 편집 가능한 요약으로 변환할 수 있습니다.',
  'https://openai.com/business/updates-to-chatgpt-business-plans-livestream-june-2025/',
  'official',
  'OpenAI',
  '2025-06-04T00:00:00Z'
),

-- 2025년 5월 업데이트
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'Memory 기능 무료 사용자 확대',
  'Memory 개선사항이 무료 사용자에게 출시되기 시작했습니다.',
  '이전에 있던 저장된 메모리 외에도, ChatGPT는 이제 최근 대화를 참조하여 더 관련성 있고 맞춤화된 응답을 제공합니다.',
  'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
  'official',
  'OpenAI Help Center',
  '2025-05-15T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'Image Library 기능 출시',
  'ChatGPT로 생성한 모든 이미지가 사이드바의 새로운 라이브러리에 자동으로 저장됩니다.',
  '과거 대화를 뒤지지 않고도 작업을 탐색, 재방문, 재사용할 수 있는 하나의 장소를 제공합니다. 라이브러리는 Web, iOS, Android에서 Free, Plus, Pro 사용자에게 출시됩니다 (Enterprise/Edu 지원 곧 제공).',
  'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
  'official',
  'OpenAI Help Center',
  '2025-05-10T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'GPT-4.5 Enterprise/Edu 사용자 확대',
  'Enterprise 및 Edu 플랜 사용자가 이제 ChatGPT에서 GPT-4.5 모델을 사용할 수 있습니다.',
  'Pro 플랜에 이어 Enterprise와 Edu 사용자에게도 GPT-4.5 모델이 제공되어 더 향상된 AI 성능을 경험할 수 있습니다.',
  'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
  'official',
  'OpenAI Help Center',
  '2025-05-13T00:00:00Z'
);

-- 업데이트 확인 쿼리
SELECT 
  s.name as service_name,
  u.title,
  u.source_name,
  u.published_at
FROM service_updates u
JOIN ai_services s ON u.service_id = s.id
WHERE s.name ILIKE '%ChatGPT%' OR s.name ILIKE '%OpenAI%'
ORDER BY u.published_at DESC;