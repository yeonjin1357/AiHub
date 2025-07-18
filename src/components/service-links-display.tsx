'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  CreditCard,
  BookOpen,
  PlayCircle,
  Phone,
  Code,
  MessageCircle,
  Rss,
  Download,
  Monitor,
  Video,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';

interface ServiceLink {
  id?: string;
  label: string;
  url: string;
  icon: string;
  description: string;
  display_order?: number;
}

interface ServiceLinksDisplayProps {
  serviceId: string;
  serviceSlug: string;
  serviceName: string;
  websiteUrl: string;
}

const IconMap: { [key: string]: any } = {
  pricing: CreditCard,
  docs: BookOpen,
  tutorial: PlayCircle,
  support: Phone,
  api: Code,
  community: MessageCircle,
  blog: Rss,
  download: Download,
  demo: Monitor,
  video: Video,
  website: ExternalLink,
  discord: MessageCircle,
  youtube: Video,
};

export function ServiceLinksDisplay({ serviceId, serviceSlug, serviceName, websiteUrl }: ServiceLinksDisplayProps) {
  const { userProfile } = useAuth();
  const [links, setLinks] = useState<ServiceLink[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = userProfile?.role === 'ADMIN';

  useEffect(() => {
    fetchLinks();
  }, [serviceId]);

  const fetchLinks = async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}/links`);
      const responseData = await response.json();
      
      if (response.ok) {
        if (Array.isArray(responseData) && responseData.length > 0) {
          setLinks(responseData);
        } else {
          // 데이터베이스에 링크가 없으면 기본 웹사이트 링크만 표시
          const defaultLink: ServiceLink = {
            label: '공식 웹사이트',
            url: websiteUrl,
            icon: 'website',
            description: `${serviceName} 공식 웹사이트 방문`
          };
          setLinks([defaultLink]);
        }
      } else {
        console.error('API Error:', responseData);
        // API 호출 실패시 기본 웹사이트 링크만 표시
        const defaultLink: ServiceLink = {
          label: '공식 웹사이트',
          url: websiteUrl,
          icon: 'website',
          description: `${serviceName} 공식 웹사이트 방문`
        };
        setLinks([defaultLink]);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
      // 에러 발생시 기본 웹사이트 링크만 표시
      const defaultLink: ServiceLink = {
        label: '공식 웹사이트',
        url: websiteUrl,
        icon: 'website',
        description: `${serviceName} 공식 웹사이트 방문`
      };
      setLinks([defaultLink]);
    } finally {
      setLoading(false);
    }
  };

  const getIconForLinkType = (iconType: string) => {
    return IconMap[iconType] || ExternalLink;
  };

  return (
    <Card className="border-gray-100 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-lg flex items-center justify-between">
          유용한 링크
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href={`/admin/services/${serviceSlug}/links`}>
                <Settings className="h-4 w-4 mr-2" />
                관리
              </Link>
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="pt-6 border-t border-gray-100 space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {loading ? (
              <div className="text-center py-4 text-gray-500">로딩 중...</div>
            ) : links.length === 0 ? (
              <div className="text-center py-4 text-gray-500">등록된 링크가 없습니다</div>
            ) : (
              links.map((link, index) => {
                const IconComponent = getIconForLinkType(link.icon);
                return (
                  <Button
                    key={link.id || index}
                    variant='ghost'
                    size='sm'
                    asChild
                    className='h-auto p-3 justify-start text-left hover:bg-gray-50'
                  >
                    <a
                      href={link.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-3'
                    >
                      <div className='w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0'>
                        <IconComponent
                          size={14}
                          className='text-blue-600'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='text-sm font-medium text-gray-900'>
                          {link.label}
                        </div>
                        <div className='text-xs text-gray-500 truncate'>
                          {link.description}
                        </div>
                      </div>
                      <ExternalLink
                        size={12}
                        className='text-gray-400 flex-shrink-0'
                      />
                    </a>
                  </Button>
                );
              })
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}