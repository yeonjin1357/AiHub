'use client';

import Image from 'next/image';

const aiServices = [
  { name: 'OpenAI', logo: '/logos/ai-services/openai.svg' },
  { name: 'Claude', logo: '/logos/ai-services/claude.svg' },
  { name: 'Gemini', logo: '/logos/ai-services/gemini.svg' },
  { name: 'Midjourney', logo: '/logos/ai-services/midjourney.svg' },
  { name: 'DALL-E', logo: '/logos/ai-services/dalle.svg' },
  { name: 'GitHub Copilot', logo: '/logos/ai-services/github-copilot.svg' },
  { name: 'Microsoft Copilot', logo: '/logos/ai-services/copilot.svg' },
  { name: 'Cursor', logo: '/logos/ai-services/cursor.svg' },
  { name: 'Notion', logo: '/logos/ai-services/notion.svg' },
  { name: 'Perplexity', logo: '/logos/ai-services/perplexity.svg' },
  { name: 'Runway', logo: '/logos/ai-services/runway.svg' },
  { name: 'Adobe Firefly', logo: '/logos/ai-services/adobe-firefly.svg' },
  { name: 'Grok', logo: '/logos/ai-services/grok.svg' },
  { name: 'Ideogram', logo: '/logos/ai-services/ideogram.svg' },
  { name: 'Novel AI', logo: '/logos/ai-services/novel-ai.svg' },
  { name: 'Ollama', logo: '/logos/ai-services/ollama.svg' },
  { name: 'Poe', logo: '/logos/ai-services/poe.svg' },
  { name: 'Replit', logo: '/logos/ai-services/replit.svg' },
  { name: 'Bolt', logo: '/logos/ai-services/bolt.svg' },
  { name: 'Figma', logo: '/logos/ai-services/figma.svg' },
  { name: 'Character AI', logo: '/logos/ai-services/character-ai.svg' },
  { name: 'Deep AI', logo: '/logos/ai-services/deep-ai.svg' },
  { name: 'Heygen', logo: '/logos/ai-services/heygen.svg' },
  { name: 'Lovable', logo: '/logos/ai-services/lovable.svg' },
  { name: 'InVideo', logo: '/logos/ai-services/invideo.svg' },
  { name: 'Canva', logo: '/logos/ai-services/canva.svg' },
  { name: 'CapCut', logo: '/logos/ai-services/capcut.svg' },
  { name: 'Clova', logo: '/logos/ai-services/clova.svg' },
  { name: 'Copy.ai', logo: '/logos/ai-services/copy-ai.svg' },
  { name: 'DeepSeek', logo: '/logos/ai-services/deepseek.svg' },
  { name: 'ElevenLabs', logo: '/logos/ai-services/elevenlabs.svg' },
  { name: 'Jasper', logo: '/logos/ai-services/jasper.svg' },
  { name: 'Otter.ai', logo: '/logos/ai-services/otter-ai.svg' },
  { name: 'Stability AI', logo: '/logos/ai-services/stability.svg' },
  { name: 'Suno', logo: '/logos/ai-services/suno.svg' },
  { name: 'Windsurf', logo: '/logos/ai-services/windsurf.svg' },
];

export function AILogosSection() {
  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur'>
      <div className='mx-auto max-w-7xl'>
        <div className='text-center mb-12'>
          <p className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
            인기 AI 서비스 모음
          </p>
          <h2 className='mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl'>
            개발자부터 창작자까지 모두가 사용하는
          </h2>
        </div>

        {/* 로고 슬라이드 컨테이너 */}
        <div className='relative overflow-hidden'>
          <div className='flex animate-infinite-scroll'>
            {/* 첫 번째 세트 */}
            {[...aiServices, ...aiServices].map((service, index) => (
              <div
                key={index}
                className='flex-shrink-0 flex items-center justify-center group'
                style={{ minWidth: '120px', height: '80px' }}
              >
                <Image
                  src={service.logo}
                  alt={`${service.name} logo`}
                  width={64}
                  height={64}
                  className='w-12 h-12 sm:w-16 sm:h-16 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0'
                />
              </div>
            ))}
          </div>

          {/* 그라데이션 페이드 */}
          <div className='absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/80 dark:from-slate-900/80 to-transparent pointer-events-none z-10'></div>
          <div className='absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/80 dark:from-slate-900/80 to-transparent pointer-events-none z-10'></div>
        </div>

        <div className='text-center mt-8'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            검증된 AI 도구들을 한눈에 확인하세요
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 50s linear infinite;
          width: fit-content;
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
