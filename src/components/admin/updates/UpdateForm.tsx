'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ServiceUpdate {
  id: string
  service_id: string
  title: string
  description: string | null
  content: string | null
  link_url: string | null
  source: string
  source_name: string | null
  published_at: string
  created_at: string
}

interface UpdateFormProps {
  serviceId: string
  update: ServiceUpdate | null
  onSave: () => void
  onCancel: () => void
}

export default function UpdateForm({ serviceId, update, onSave, onCancel }: UpdateFormProps) {
  const [formData, setFormData] = useState({
    title: update?.title || '',
    description: update?.description || '',
    content: update?.content || '',
    link_url: update?.link_url || '',
    source: update?.source || '',
    source_name: update?.source_name || '',
    published_at: update?.published_at ? new Date(update.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = update
        ? `/api/services/${serviceId}/updates/${update.id}`
        : `/api/services/${serviceId}/updates`
      
      const method = update ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        onSave()
      } else {
        const data = await response.json()
        alert(`저장 실패: ${data.error}`)
      }
    } catch (error) {
      console.error('Error saving update:', error)
      alert('업데이트 저장 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <Label htmlFor="title">제목 *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">간단한 설명</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="content">상세 내용</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={6}
          placeholder="마크다운 형식을 지원합니다."
        />
      </div>

      <div>
        <Label htmlFor="link_url">링크 URL</Label>
        <Input
          id="link_url"
          type="url"
          value={formData.link_url}
          onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
          placeholder="https://example.com/update"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="source">출처 *</Label>
          <Input
            id="source"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            required
            placeholder="official, blog, news 등"
          />
        </div>

        <div>
          <Label htmlFor="source_name">출처 이름</Label>
          <Input
            id="source_name"
            value={formData.source_name}
            onChange={(e) => setFormData({ ...formData, source_name: e.target.value })}
            placeholder="공식 블로그, TechCrunch 등"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="published_at">발행일 *</Label>
        <Input
          id="published_at"
          type="date"
          value={formData.published_at}
          onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
          required
        />
      </div>

      <div className="flex gap-2 justify-end pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={submitting}
        >
          취소
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? '저장 중...' : (update ? '수정' : '추가')}
        </Button>
      </div>
    </form>
  )
}