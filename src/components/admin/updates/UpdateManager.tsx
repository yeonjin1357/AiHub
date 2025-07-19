'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit2, Trash2, Calendar, Link as LinkIcon } from 'lucide-react'
import UpdateForm from './UpdateForm'
import { formatDate } from '@/utils/helpers'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'

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

interface UpdateManagerProps {
  serviceId: string
}

export default function UpdateManager({ serviceId }: UpdateManagerProps) {
  const [updates, setUpdates] = useState<ServiceUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUpdate, setEditingUpdate] = useState<ServiceUpdate | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchUpdates()
  }, [serviceId])

  const fetchUpdates = async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}/updates`)
      const data = await response.json()
      
      if (response.ok) {
        setUpdates(data.updates || data || [])
      } else {
        console.error('Failed to fetch updates:', data.error)
      }
    } catch (error) {
      console.error('Error fetching updates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (updateId: string) => {
    if (!confirm('정말로 이 업데이트를 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/services/${serviceId}/updates/${updateId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchUpdates()
        toast.success('업데이트가 삭제되었습니다.')
      } else {
        const data = await response.json()
        toast.error(`삭제 실패: ${data.error}`)
      }
    } catch (error) {
      console.error('Error deleting update:', error)
      toast.error('업데이트 삭제 중 오류가 발생했습니다.')
    }
  }

  const handleSave = async () => {
    await fetchUpdates()
    setIsDialogOpen(false)
    setEditingUpdate(null)
    toast.success(editingUpdate ? '업데이트가 수정되었습니다.' : '업데이트가 추가되었습니다.')
  }

  if (loading) {
    return (
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>서비스 업데이트 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>서비스 업데이트 관리</CardTitle>
          <Button
            onClick={() => {
              setEditingUpdate(null)
              setIsDialogOpen(true)
            }}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            새 업데이트 추가
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {updates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>등록된 업데이트가 없습니다.</p>
              <Button
                onClick={() => {
                  setEditingUpdate(null)
                  setIsDialogOpen(true)
                }}
                className="mt-4"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                첫 업데이트 추가하기
              </Button>
            </div>
          ) : (
            updates.map((update) => (
              <div key={update.id} className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{update.title}</h3>
                      {update.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {update.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {update.source_name || update.source}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {formatDate(update.published_at)}
                        </div>
                        {update.link_url && (
                          <a
                            href={update.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                          >
                            <LinkIcon className="h-3 w-3" />
                            자세히 보기
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingUpdate(update)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(update.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingUpdate ? '업데이트 수정' : '새 업데이트 추가'}
            </DialogTitle>
          </DialogHeader>
          <UpdateForm
            serviceId={serviceId}
            update={editingUpdate}
            onSave={handleSave}
            onCancel={() => {
              setIsDialogOpen(false)
              setEditingUpdate(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </Card>
  )
}