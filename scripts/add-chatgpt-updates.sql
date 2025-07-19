-- ChatGPT 서비스 업데이트 데이터 추가
-- 먼저 ChatGPT 서비스 ID를 확인하고 업데이트 데이터를 추가합니다

-- ChatGPT 서비스 업데이트 데이터 삽입
INSERT INTO service_updates (service_id, title, description, link_url, source, source_name, published_at) VALUES
-- ChatGPT 서비스 ID는 실제 데이터베이스에서 확인 후 수정 필요
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'ChatGPT Plus 사용자를 위한 GPT-4o 무제한 사용',
  'ChatGPT Plus 구독자는 이제 GPT-4o를 무제한으로 사용할 수 있습니다. 향상된 추론 능력과 더 빠른 응답 속도를 경험해보세요.',
  'https://openai.com/blog/gpt-4o-unlimited-for-chatgpt-plus',
  'official',
  'OpenAI Blog',
  '2024-12-15T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'ChatGPT Desktop 앱 정식 출시',
  '이제 Windows와 macOS에서 ChatGPT 데스크톱 앱을 사용할 수 있습니다. 더 편리한 접근성과 향상된 사용자 경험을 제공합니다.',
  'https://openai.com/blog/chatgpt-desktop-app',
  'official',
  'OpenAI Blog',
  '2024-11-28T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'OpenAI o3 모델 발표 - AGI에 한 걸음 더',
  'OpenAI가 차세대 AI 모델 o3를 발표했습니다. 수학, 과학, 프로그래밍 분야에서 혁신적인 성능 향상을 보여줍니다.',
  'https://www.youtube.com/watch?v=SKBG1sqdyIU',
  'youtube',
  'OpenAI',
  '2024-12-20T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'ChatGPT 검색 기능 모든 사용자에게 확대',
  '이전에는 Plus 구독자만 사용할 수 있었던 ChatGPT 검색 기능이 이제 모든 사용자에게 제공됩니다.',
  'https://techcrunch.com/2024/11/01/openai-expands-chatgpt-search-to-all-users/',
  'news',
  'TechCrunch',
  '2024-11-01T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'ChatGPT Canvas 기능 출시',
  '새로운 Canvas 인터페이스로 텍스트와 코드를 더 효과적으로 편집하고 협업할 수 있습니다. 실시간 편집과 버전 관리를 지원합니다.',
  'https://openai.com/blog/introducing-canvas',
  'official',
  'OpenAI Blog',
  '2024-10-03T00:00:00Z'
),
(
  (SELECT id FROM ai_services WHERE name ILIKE '%ChatGPT%' OR name ILIKE '%OpenAI%' LIMIT 1),
  'ChatGPT 음성 모드 개선 업데이트',
  '더 자연스러운 음성 인식과 응답 기능이 추가되었습니다. 실시간 대화와 감정 인식 기능이 향상되었습니다.',
  'https://www.theverge.com/2024/9/25/24254041/openai-chatgpt-advanced-voice-mode-rollout',
  'news',
  'The Verge',
  '2024-09-25T00:00:00Z'
);

-- 업데이트 확인
SELECT 
  s.name as service_name,
  u.title,
  u.source_name,
  u.published_at
FROM service_updates u
JOIN ai_services s ON u.service_id = s.id
WHERE s.name ILIKE '%ChatGPT%' OR s.name ILIKE '%OpenAI%'
ORDER BY u.published_at DESC;