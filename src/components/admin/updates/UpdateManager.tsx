'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Link as LinkIcon,
  GripVertical,
} from 'lucide-react';
import UpdateForm from './UpdateForm';
import { formatDate, formatDateYearMonth } from '@/utils/helpers';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

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

interface UpdateManagerProps {
  serviceId: string;
}

export default function UpdateManager({ serviceId }: UpdateManagerProps) {
  const [updates, setUpdates] = useState<ServiceUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUpdate, setEditingUpdate] = useState<ServiceUpdate | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchUpdates();
  }, [serviceId]);

  const fetchUpdates = async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}/updates`);
      const data = await response.json();

      if (response.ok) {
        setUpdates(data.updates || data || []);
      } else {
        console.error('Failed to fetch updates:', data.error);
      }
    } catch (error) {
      console.error('Error fetching updates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (updateId: string) => {
    if (!confirm('정말로 이 업데이트를 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(
        `/api/services/${serviceId}/updates/${updateId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        await fetchUpdates();
        toast.success('업데이트가 삭제되었습니다.');
      } else {
        const data = await response.json();
        toast.error(`삭제 실패: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting update:', error);
      toast.error('업데이트 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleSave = async () => {
    await fetchUpdates();
    setIsDialogOpen(false);
    setEditingUpdate(null);
    toast.success(
      editingUpdate
        ? '업데이트가 수정되었습니다.'
        : '업데이트가 추가되었습니다.'
    );
  };

  // 드래그 앤 드롭 핸들러
  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(updates);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // 임시로 UI 업데이트
    setUpdates(items);

    // TODO: 서버에 순서 업데이트 요청
    // 현재는 published_at으로 정렬되므로, display_order 필드 추가가 필요합니다
    toast.info(
      '업데이트 순서가 변경되었습니다. (현재는 발행일 기준 정렬이 유지됩니다)'
    );
  };

  if (loading) {
    return (
      <Card className='glass border-0 gradient-border-effect'>
        <CardHeader>
          <CardTitle className="text-white">서비스 업데이트 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='h-20 bg-white/5 rounded-lg animate-pulse' />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='glass border-0 gradient-border-effect' style={{ backdropFilter: 'none', WebkitBackdropFilter: 'none' }}>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className="text-white">서비스 업데이트 관리</CardTitle>
          <Button
            onClick={() => {
              setEditingUpdate(null);
              setIsDialogOpen(true);
            }}
            size='sm'
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0"
          >
            <Plus className='h-4 w-4 mr-2' />새 업데이트 추가
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {updates.length === 0 ? (
          <div className='text-center py-8 text-zinc-500'>
            <p>등록된 업데이트가 없습니다.</p>
            <Button
              onClick={() => {
                setEditingUpdate(null);
                setIsDialogOpen(true);
              }}
              className='mt-4 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
              variant='outline'
            >
              <Plus className='h-4 w-4 mr-2' />첫 업데이트 추가하기
            </Button>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='updates'>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className='space-y-3'
                >
                  {updates.map((update, index) => (
                    <Draggable
                      key={update.id}
                      draggableId={update.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center gap-3 p-4 rounded-lg transition-all ${
                            snapshot.isDragging 
                              ? 'bg-white/10 border border-white/20 shadow-2xl shadow-blue-500/20' 
                              : 'bg-white/5 border border-white/10 backdrop-blur-sm'
                          }`}
                          style={{
                            ...provided.draggableProps.style,
                            backdropFilter: snapshot.isDragging ? 'none' : undefined,
                          }}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className='flex items-center justify-center cursor-move'
                          >
                            <GripVertical className='h-5 w-5 text-zinc-400' />
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                              <div className='flex-1'>
                                <h3 className='font-medium text-white'>
                                  {update.title}
                                </h3>
                                {update.description && (
                                  <p className='text-sm text-zinc-400 mt-1 line-clamp-2'>
                                    {update.description}
                                  </p>
                                )}
                                <div className='flex items-center gap-3 mt-2'>
                                  <Badge
                                    variant='secondary'
                                    className='text-xs bg-white/10 text-zinc-300 hover:bg-white/20'
                                  >
                                    {update.source_name || update.source}
                                  </Badge>
                                  <div className='flex items-center gap-1 text-xs text-zinc-500'>
                                    <Calendar className='h-3 w-3' />
                                    {formatDateYearMonth(update.published_at)}
                                  </div>
                                  {update.link_url && (
                                    <a
                                      href={update.link_url}
                                      target='_blank'
                                      rel='noopener noreferrer'
                                      className='flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300'
                                    >
                                      <LinkIcon className='h-3 w-3' />
                                      자세히 보기
                                    </a>
                                  )}
                                </div>
                              </div>
                              <div className='flex gap-2 ml-4'>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  onClick={() => {
                                    setEditingUpdate(update);
                                    setIsDialogOpen(true);
                                  }}
                                  className="hover:bg-white/10 text-zinc-400 hover:text-white"
                                >
                                  <Edit2 className='h-4 w-4' />
                                </Button>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  onClick={() => handleDelete(update.id)}
                                  className="hover:bg-red-500/10 text-zinc-400 hover:text-red-400"
                                >
                                  <Trash2 className='h-4 w-4' />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-w-2xl bg-[#0a0a0b] border border-white/10'>
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingUpdate ? '업데이트 수정' : '새 업데이트 추가'}
            </DialogTitle>
          </DialogHeader>
          <UpdateForm
            serviceId={serviceId}
            update={editingUpdate}
            onSave={handleSave}
            onCancel={() => {
              setIsDialogOpen(false);
              setEditingUpdate(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
