'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  Calendar,
  Globe,
  Youtube,
  FileText,
  Newspaper,
  ListRestart,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ServiceUpdate {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  link_url: string | null;
  source: string;
  source_name: string | null;
  published_at: string;
}

interface ServiceUpdatesDisplayProps {
  serviceId: string;
}

export function ServiceUpdatesDisplay({
  serviceId,
}: ServiceUpdatesDisplayProps) {
  const [updates, setUpdates] = useState<ServiceUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    // 이미 데이터를 가져왔으면 다시 가져오지 않음
    if (!hasFetched) {
      fetchUpdates();
    }
  }, [serviceId, hasFetched]);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/services/${serviceId}/updates`);

      if (!response.ok) {
        throw new Error('업데이트를 불러오는데 실패했습니다');
      }

      const data = await response.json();
      setUpdates(data);
      setHasFetched(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다'
      );
    } finally {
      setLoading(false);
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'update':
        return <ListRestart size={16} className='text-blue-400' />;
      case 'youtube':
        return <Youtube size={16} className='text-red-400' />;
      case 'blog':
        return <FileText size={16} className='text-green-400' />;
      case 'news':
        return <Newspaper size={16} className='text-purple-400' />;
      default:
        return <ExternalLink size={16} className='text-zinc-400' />;
    }
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'update':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'youtube':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'blog':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'news':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
    });
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        {[...Array(3)].map((_, index) => (
          <Card key={index} className='glass border-0'>
            <CardContent className='p-6'>
              <div className='animate-pulse'>
                <div className='h-4 bg-zinc-800 rounded w-3/4 mb-3'></div>
                <div className='h-3 bg-zinc-800 rounded w-1/2 mb-2'></div>
                <div className='h-3 bg-zinc-800 rounded w-full'></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className='glass border-0 border-red-500/20'>
        <CardContent className='p-6 text-center'>
          <div className='text-red-400 mb-2'>오류가 발생했습니다</div>
          <div className='text-sm text-red-400/80 mb-4'>{error}</div>
          <Button
            variant='outline'
            size='sm'
            onClick={fetchUpdates}
            className='border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300'
          >
            다시 시도
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (updates.length === 0) {
    return (
      <Card className='glass border-0'>
        <CardContent className='p-8 text-center'>
          <div className='text-zinc-500 mb-2'>
            <FileText size={48} className='mx-auto mb-4 text-zinc-600' />
            <div className='text-lg font-medium text-zinc-300'>
              업데이트 정보가 없습니다
            </div>
            <div className='text-sm text-zinc-500'>
              이 서비스의 최신 업데이트나 뉴스가 준비되면 여기에 표시됩니다.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-semibold text-white'>
          최신 업데이트 & 뉴스
        </h3>
        <div className='text-sm text-zinc-500'>
          총 {updates.length}개의 업데이트
        </div>
      </div>

      <div className='space-y-4'>
        {updates.map((update) => (
          <Card
            key={update.id}
            className='glass border-0 gradient-border-effect hover:shadow-2xl hover:shadow-blue-500/10 transition-all'
          >
            <CardContent className='p-6'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-3'>
                    {getSourceIcon(update.source)}
                    <Badge className={getSourceBadgeColor(update.source)}>
                      {update.source_name || update.source}
                    </Badge>
                    <div className='flex items-center gap-1 text-sm text-zinc-500'>
                      <Calendar size={14} />
                      {formatDate(update.published_at)}
                    </div>
                  </div>

                  <h4 className='text-lg font-medium text-white mb-2 leading-snug'>
                    {update.title}
                  </h4>

                  {update.description && (
                    <p className='text-zinc-400 text-sm leading-relaxed mb-4'>
                      {update.description}
                    </p>
                  )}

                  {update.link_url && (
                    <Button
                      asChild
                      variant='outline'
                      size='sm'
                      className='border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/20'
                    >
                      <a
                        href={update.link_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2'
                      >
                        <ExternalLink size={14} />
                        자세히 보기
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
