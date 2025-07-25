'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ServiceUpdate {
  id: string;
  service_id: string;
  title: string;
  description: string | null;
  content: string | null;
  link_url: string | null;
  source: string;
  source_name: string | null;
  published_at: string;
  created_at: string;
}

interface UpdateFormProps {
  serviceId: string;
  update: ServiceUpdate | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function UpdateForm({
  serviceId,
  update,
  onSave,
  onCancel,
}: UpdateFormProps) {
  // 기존 날짜를 년, 월, 일로 분리
  const getDateParts = (dateStr: string | null) => {
    if (!dateStr) {
      const now = new Date();
      return {
        year: now.getFullYear().toString(),
        month: (now.getMonth() + 1).toString().padStart(2, '0'),
        day: '',
      };
    }
    const date = new Date(dateStr);
    return {
      year: date.getFullYear().toString(),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      day: date.getDate().toString(),
    };
  };

  const dateParts = getDateParts(update?.published_at || null);

  const [formData, setFormData] = useState({
    title: update?.title || '',
    description: update?.description || '',
    content: update?.content || '',
    link_url: update?.link_url || '',
    source: update?.source || '',
    source_name: update?.source_name || '',
    published_year: dateParts.year,
    published_month: dateParts.month,
    published_day: dateParts.day,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = update
        ? `/api/services/${serviceId}/updates/${update.id}`
        : `/api/services/${serviceId}/updates`;

      const method = update ? 'PUT' : 'POST';

      // 날짜 조합 (일이 없으면 1일로 설정)
      const day = formData.published_day || '01';
      const dateStr = `${formData.published_year}-${
        formData.published_month
      }-${day.padStart(2, '0')}`;
      const published_at = new Date(dateStr).toISOString();

      const submitData = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        link_url: formData.link_url,
        source: formData.source,
        source_name: formData.source_name,
        published_at,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        onSave();
      } else {
        const data = await response.json();
        alert(`저장 실패: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving update:', error);
      alert('업데이트 저장 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <Label htmlFor='title'>제목 *</Label>
        <Input
          id='title'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor='description'>간단한 설명</Label>
        <Textarea
          id='description'
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor='content'>상세 내용</Label>
        <Textarea
          id='content'
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          rows={6}
          placeholder='마크다운 형식을 지원합니다.'
        />
      </div>

      <div>
        <Label htmlFor='link_url'>링크 URL</Label>
        <Input
          id='link_url'
          type='url'
          value={formData.link_url}
          onChange={(e) =>
            setFormData({ ...formData, link_url: e.target.value })
          }
          placeholder='https://example.com/update'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='source'>출처 *</Label>
          <Input
            id='source'
            value={formData.source}
            onChange={(e) =>
              setFormData({ ...formData, source: e.target.value })
            }
            required
            placeholder='update, youtube, blog, news'
          />
        </div>

        <div>
          <Label htmlFor='source_name'>출처 이름</Label>
          <Input
            id='source_name'
            value={formData.source_name}
            onChange={(e) =>
              setFormData({ ...formData, source_name: e.target.value })
            }
            placeholder='공식 블로그, TechCrunch 등'
          />
        </div>
      </div>

      <div>
        <Label>발행일 *</Label>
        <div className='grid grid-cols-3 gap-2'>
          <div>
            <Input
              type='number'
              placeholder='년도'
              value={formData.published_year}
              onChange={(e) =>
                setFormData({ ...formData, published_year: e.target.value })
              }
              required
              min='2000'
              max='2099'
            />
          </div>
          <div>
            <Select
              value={formData.published_month}
              onValueChange={(value) =>
                setFormData({ ...formData, published_month: value })
              }
              required
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0b] border border-white/10">
                <SelectItem value='01' className="text-white hover:bg-white/10">1월</SelectItem>
                <SelectItem value='02' className="text-white hover:bg-white/10">2월</SelectItem>
                <SelectItem value='03' className="text-white hover:bg-white/10">3월</SelectItem>
                <SelectItem value='04' className="text-white hover:bg-white/10">4월</SelectItem>
                <SelectItem value='05' className="text-white hover:bg-white/10">5월</SelectItem>
                <SelectItem value='06' className="text-white hover:bg-white/10">6월</SelectItem>
                <SelectItem value='07' className="text-white hover:bg-white/10">7월</SelectItem>
                <SelectItem value='08' className="text-white hover:bg-white/10">8월</SelectItem>
                <SelectItem value='09' className="text-white hover:bg-white/10">9월</SelectItem>
                <SelectItem value='10' className="text-white hover:bg-white/10">10월</SelectItem>
                <SelectItem value='11' className="text-white hover:bg-white/10">11월</SelectItem>
                <SelectItem value='12' className="text-white hover:bg-white/10">12월</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              type='number'
              placeholder='일 (선택)'
              value={formData.published_day}
              onChange={(e) =>
                setFormData({ ...formData, published_day: e.target.value })
              }
              min='1'
              max='31'
            />
          </div>
        </div>
        <p className='text-xs text-zinc-400 mt-1'>
          일자는 선택사항입니다. 비워두면 1일로 저장됩니다.
        </p>
      </div>

      <div className='flex gap-2 justify-end pt-4 border-t'>
        <Button
          type='button'
          variant='outline'
          className='border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
          onClick={onCancel}
          disabled={submitting}
        >
          취소
        </Button>
        <Button type='submit' disabled={submitting}>
          {submitting ? '저장 중...' : update ? '수정' : '추가'}
        </Button>
      </div>
    </form>
  );
}
