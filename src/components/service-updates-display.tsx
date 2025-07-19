'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Calendar, Globe, Youtube, FileText, Newspaper } from 'lucide-react';
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

export function ServiceUpdatesDisplay({ serviceId }: ServiceUpdatesDisplayProps) {
  const [updates, setUpdates] = useState<ServiceUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUpdates();
  }, [serviceId]);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/services/${serviceId}/updates`);
      
      if (!response.ok) {
        throw new Error('업데이트를 불러오는데 실패했습니다');
      }

      const data = await response.json();
      setUpdates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'official':
        return <Globe size={16} className="text-blue-600" />;
      case 'youtube':
        return <Youtube size={16} className="text-red-600" />;
      case 'blog':
        return <FileText size={16} className="text-green-600" />;
      case 'news':
        return <Newspaper size={16} className="text-purple-600" />;
      default:
        return <ExternalLink size={16} className="text-gray-600" />;
    }
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'official':
        return 'bg-blue-100 text-blue-800';
      case 'youtube':
        return 'bg-red-100 text-red-800';
      case 'blog':
        return 'bg-green-100 text-green-800';
      case 'news':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="border-gray-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-100 shadow-sm bg-red-50">
        <CardContent className="p-6 text-center">
          <div className="text-red-600 mb-2">오류가 발생했습니다</div>
          <div className="text-sm text-red-500 mb-4">{error}</div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchUpdates}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            다시 시도
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (updates.length === 0) {
    return (
      <Card className="border-gray-100 shadow-sm bg-white">
        <CardContent className="p-8 text-center">
          <div className="text-gray-500 mb-2">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <div className="text-lg font-medium">업데이트 정보가 없습니다</div>
            <div className="text-sm">
              이 서비스의 최신 업데이트나 뉴스가 준비되면 여기에 표시됩니다.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">최신 업데이트 & 뉴스</h3>
        <div className="text-sm text-gray-500">
          총 {updates.length}개의 업데이트
        </div>
      </div>

      <div className="space-y-4">
        {updates.map((update) => (
          <Card key={update.id} className="border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {getSourceIcon(update.source)}
                    <Badge className={getSourceBadgeColor(update.source)}>
                      {update.source_name || update.source}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      {formatDate(update.published_at)}
                    </div>
                  </div>

                  <h4 className="text-lg font-medium text-gray-900 mb-2 leading-snug">
                    {update.title}
                  </h4>

                  {update.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {update.description}
                    </p>
                  )}

                  {update.link_url && (
                    <Button asChild variant="outline" size="sm">
                      <Link 
                        href={update.link_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <ExternalLink size={14} />
                        자세히 보기
                      </Link>
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