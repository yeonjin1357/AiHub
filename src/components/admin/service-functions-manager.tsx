'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Edit2, Trash2, GripVertical, Save, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import * as Icons from 'lucide-react';

interface ServiceFunction {
  id?: string;
  service_id: string;
  name: string;
  description: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
}

interface ServiceFunctionsManagerProps {
  serviceId: string;
}

export function ServiceFunctionsManager({
  serviceId,
}: ServiceFunctionsManagerProps) {
  const [functions, setFunctions] = useState<ServiceFunction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFunction, setEditingFunction] =
    useState<ServiceFunction | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon_name: 'Zap',
  });

  // 서비스 기능 로드
  const loadFunctions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/services/${serviceId}/functions`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to load functions');
      }

      const data = await response.json();
      console.log('Loaded functions:', data);
      setFunctions(data);
    } catch (error) {
      console.error('Error loading functions:', error);
      if (
        error instanceof Error &&
        error.message.includes('relation') &&
        error.message.includes('does not exist')
      ) {
        toast.error(
          '서비스 기능 테이블이 생성되지 않았습니다. Supabase에서 SQL을 실행해주세요.'
        );
      } else {
        toast.error('기능을 불러오는데 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFunctions();
  }, [serviceId]);

  // 드래그 앤 드롭 핸들러
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(functions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // display_order 업데이트
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index,
    }));

    setFunctions(updatedItems);
  };

  // 기능 추가
  const handleAddFunction = async () => {
    if (!formData.name.trim()) {
      toast.error('기능 이름을 입력해주세요.');
      return;
    }

    try {
      const newFunction: Omit<ServiceFunction, 'id'> = {
        service_id: serviceId,
        name: formData.name,
        description:
          formData.description ||
          '이 기능을 통해 더욱 효율적인 작업이 가능합니다.',
        icon_name: formData.icon_name,
        display_order: functions.length,
        is_active: true,
      };

      const response = await fetch(`/api/services/${serviceId}/functions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFunction),
      });

      if (!response.ok) {
        throw new Error('Failed to add function');
      }

      const data = await response.json();
      setFunctions([...functions, data]);
      setFormData({ name: '', description: '', icon_name: 'Zap' });
      setIsDialogOpen(false);
      toast.success('기능이 추가되었습니다.');
    } catch (error) {
      console.error('Error adding function:', error);
      toast.error('기능 추가에 실패했습니다.');
    }
  };

  // 기능 수정
  const handleUpdateFunction = async () => {
    if (!editingFunction || !formData.name.trim()) {
      toast.error('기능 이름을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(
        `/api/services/${serviceId}/functions/${editingFunction.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            icon_name: formData.icon_name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update function');
      }

      const updatedFunction = await response.json();
      setFunctions(
        functions.map((fn) =>
          fn.id === updatedFunction.id ? updatedFunction : fn
        )
      );
      setEditingFunction(null);
      setFormData({ name: '', description: '', icon_name: 'Zap' });
      setIsDialogOpen(false);
      toast.success('기능이 수정되었습니다.');
    } catch (error) {
      console.error('Error updating function:', error);
      toast.error('기능 수정에 실패했습니다.');
    }
  };

  // 기능 삭제
  const handleDeleteFunction = async (functionId: string) => {
    if (!confirm('정말로 이 기능을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(
        `/api/services/${serviceId}/functions/${functionId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete function');
      }

      setFunctions(functions.filter((fn) => fn.id !== functionId));
      toast.success('기능이 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting function:', error);
      toast.error('기능 삭제에 실패했습니다.');
    }
  };

  // 전체 저장
  const handleSaveAll = async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}/functions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ functions }),
      });

      if (!response.ok) {
        throw new Error('Failed to save functions');
      }

      toast.success('모든 변경사항이 저장되었습니다.');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving functions:', error);
      toast.error('저장에 실패했습니다.');
    }
  };

  // 아이콘 컴포넌트 가져오기
  const getIconComponent = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.Zap;
    return <Icon size={20} />;
  };

  if (isLoading) {
    return (
      <Card className='border-gray-200 shadow-sm'>
        <CardHeader>
          <CardTitle>서비스 기능 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='h-16 bg-gray-100 rounded animate-pulse' />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='border-gray-200 shadow-sm'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>서비스 기능 관리</CardTitle>
          <div className='flex gap-2'>
            {isEditing ? (
              <>
                <Button onClick={handleSaveAll} size='sm'>
                  <Save className='h-4 w-4 mr-2' />
                  전체 저장
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    loadFunctions(); // 변경사항 취소
                  }}
                  variant='outline'
                  size='sm'
                >
                  <X className='h-4 w-4 mr-2' />
                  취소
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} size='sm'>
                <Edit2 className='h-4 w-4 mr-2' />
                편집 모드
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId='functions'>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className='space-y-2'
                  >
                    {functions.map((func, index) => (
                      <Draggable
                        key={func.id || index}
                        draggableId={func.id || `temp-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                          >
                            <div {...provided.dragHandleProps}>
                              <GripVertical className='h-5 w-5 text-gray-400' />
                            </div>
                            <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                              {getIconComponent(func.icon_name)}
                            </div>
                            <div className='flex-1'>
                              <div className='font-medium'>{func.name}</div>
                              <div className='text-sm text-gray-600 line-clamp-1'>
                                {func.description}
                              </div>
                            </div>
                            <div className='flex gap-2'>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => {
                                  setEditingFunction(func);
                                  setFormData({
                                    name: func.name,
                                    description: func.description,
                                    icon_name: func.icon_name,
                                  });
                                  setIsDialogOpen(true);
                                }}
                              >
                                <Edit2 className='h-4 w-4' />
                              </Button>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() =>
                                  func.id && handleDeleteFunction(func.id)
                                }
                              >
                                <Trash2 className='h-4 w-4 text-red-500' />
                              </Button>
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingFunction(null);
                    setFormData({
                      name: '',
                      description: '',
                      icon_name: 'Zap',
                    });
                  }}
                  className='w-full mt-4'
                  variant='outline'
                >
                  <Plus className='h-4 w-4 mr-2' />새 기능 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingFunction ? '기능 수정' : '새 기능 추가'}
                  </DialogTitle>
                </DialogHeader>
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='name'>기능 이름</Label>
                    <Input
                      id='name'
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder='예: AI 텍스트 생성'
                    />
                  </div>
                  <div>
                    <Label htmlFor='description'>설명</Label>
                    <Textarea
                      id='description'
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder='이 기능에 대한 설명을 입력하세요.'
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor='icon'>아이콘</Label>
                    <Input
                      id='icon'
                      value={formData.icon_name}
                      onChange={(e) =>
                        setFormData({ ...formData, icon_name: e.target.value })
                      }
                      placeholder='예: Zap, Star, Brain'
                    />
                    <p className='text-xs text-gray-500 mt-1'>
                      Lucide 아이콘 이름을 입력하세요.
                    </p>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <Button
                      variant='outline'
                      onClick={() => setIsDialogOpen(false)}
                    >
                      취소
                    </Button>
                    <Button
                      onClick={
                        editingFunction
                          ? handleUpdateFunction
                          : handleAddFunction
                      }
                    >
                      {editingFunction ? '수정' : '추가'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <div className='space-y-3'>
            {functions.length > 0 ? (
              functions.map((func, index) => (
                <div
                  key={func.id || index}
                  className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'
                >
                  <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                    {getIconComponent(func.icon_name)}
                  </div>
                  <div className='flex-1'>
                    <div className='font-medium'>{func.name}</div>
                    <div className='text-sm text-gray-600'>
                      {func.description}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-8 text-gray-500'>
                <p>등록된 기능이 없습니다.</p>
                <Button
                  onClick={() => setIsEditing(true)}
                  className='mt-4'
                  variant='outline'
                >
                  <Plus className='h-4 w-4 mr-2' />
                  기능 추가하기
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
