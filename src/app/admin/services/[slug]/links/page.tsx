import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceLinksManager } from '@/components/admin/service-links-manager';
import { createClient } from '@/utils/supabase/server';

interface ServiceLinksPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getService(slug: string) {
  const supabase = await createClient();
  
  const { data: service, error } = await supabase
    .from('ai_services')
    .select('id, name, slug')
    .eq('slug', slug)
    .single();

  if (error || !service) {
    return null;
  }

  return service;
}

export default async function ServiceLinksPage({ params }: ServiceLinksPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Check if user is admin
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    notFound();
  }

  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (userProfile?.role !== 'ADMIN') {
    notFound();
  }

  const service = await getService(slug);
  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/admin/services">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            서비스 목록으로 돌아가기
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{service.name} - 링크 관리</h1>
        <p className="text-gray-600 mt-2">
          서비스의 유용한 링크를 추가, 수정, 삭제할 수 있습니다.
        </p>
      </div>

      <ServiceLinksManager serviceId={service.id} />
    </div>
  );
}