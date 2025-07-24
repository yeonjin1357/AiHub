'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Edit2, Trash2, GripVertical, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

interface ServiceLink {
  id: string;
  service_id: string;
  label: string;
  url: string;
  icon: string;
  description: string;
  display_order: number;
}

interface ServiceLinksManagerProps {
  serviceId: string;
}

const ICON_OPTIONS = [
  { value: 'pricing', label: '가격' },
  { value: 'docs', label: '문서' },
  { value: 'tutorial', label: '튜토리얼' },
  { value: 'support', label: '지원' },
  { value: 'api', label: 'API' },
  { value: 'community', label: '커뮤니티' },
  { value: 'blog', label: '블로그' },
  { value: 'download', label: '다운로드' },
  { value: 'demo', label: '데모' },
  { value: 'video', label: '비디오' },
  { value: 'discord', label: 'Discord' },
  { value: 'youtube', label: 'YouTube' },
];

export function ServiceLinksManager({ serviceId }: ServiceLinksManagerProps) {
  const [links, setLinks] = useState<ServiceLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    label: '',
    url: '',
    icon: 'docs',
    description: '',
    display_order: 0,
  });

  useEffect(() => {
    fetchLinks();
  }, [serviceId]);

  const fetchLinks = async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}/links`);
      if (!response.ok) throw new Error('Failed to fetch links');
      const data = await response.json();
      setLinks(data.sort((a: ServiceLink, b: ServiceLink) => a.display_order - b.display_order));
    } catch (error) {
      console.error('Error fetching links:', error);
      toast.error('링크를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Update existing link
        const response = await fetch(`/api/services/${serviceId}/links/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) throw new Error('Failed to update link');
        
        toast.success('링크가 수정되었습니다');
        setEditingId(null);
      } else {
        // Create new link
        const response = await fetch(`/api/services/${serviceId}/links`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) throw new Error('Failed to create link');
        
        toast.success('링크가 추가되었습니다');
        setIsAdding(false);
      }
      
      // Reset form and refresh links
      setFormData({
        label: '',
        url: '',
        icon: 'docs',
        description: '',
        display_order: 0,
      });
      fetchLinks();
    } catch (error) {
      console.error('Error saving link:', error);
      toast.error('링크 저장에 실패했습니다');
    }
  };

  const handleEdit = (link: ServiceLink) => {
    setEditingId(link.id);
    setFormData({
      label: link.label,
      url: link.url,
      icon: link.icon,
      description: link.description || '',
      display_order: link.display_order,
    });
    setIsAdding(false);
  };

  const handleDelete = async () => {
    if (!linkToDelete) return;
    
    try {
      const response = await fetch(`/api/services/${serviceId}/links/${linkToDelete}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete link');
      
      toast.success('링크가 삭제되었습니다');
      fetchLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
      toast.error('링크 삭제에 실패했습니다');
    } finally {
      setDeleteDialogOpen(false);
      setLinkToDelete(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      label: '',
      url: '',
      icon: 'docs',
      description: '',
      display_order: 0,
    });
  };

  const confirmDelete = (linkId: string) => {
    setLinkToDelete(linkId);
    setDeleteDialogOpen(true);
  };

  // 드래그 앤 드롭 핸들러
  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // display_order 업데이트
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index,
    }));

    setLinks(updatedItems);

    // 서버에 변경사항 저장
    try {
      const response = await fetch(`/api/services/${serviceId}/links/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links: updatedItems }),
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      toast.success('순서가 변경되었습니다.');
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('순서 변경 저장에 실패했습니다.');
      // 실패 시 원래 순서로 되돌리기
      fetchLinks();
    }
  };

  if (loading) {
    return (
      <Card className="glass border-0 gradient-border-effect">
        <CardHeader>
          <CardTitle className="text-white">유용한 링크 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-0 gradient-border-effect" style={{ backdropFilter: 'none', WebkitBackdropFilter: 'none' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">유용한 링크 관리</CardTitle>
          {!isAdding && !editingId && (
            <Button
              size="sm"
              onClick={() => {
                setIsAdding(true);
                setFormData({
                  ...formData,
                  display_order: links.length,
                });
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0"
            >
              <Plus className="mr-2 h-4 w-4" />
              링크 추가
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-300">레이블</label>
                <Input
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="예: 요금제 보기"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-blue-500/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300">URL</label>
                <Input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/pricing"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-blue-500/50"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-300">아이콘</label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => setFormData({ ...formData, icon: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0b] border border-white/10">
                    {ICON_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300">표시 순서</label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-blue-500/50"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-zinc-300">설명</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="링크에 대한 간단한 설명"
                rows={2}
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-blue-500/50"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleCancel}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20"
              >
                <X className="mr-2 h-4 w-4" />
                취소
              </Button>
              <Button 
                type="submit" 
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0"
              >
                <Save className="mr-2 h-4 w-4" />
                {editingId ? '수정' : '추가'}
              </Button>
            </div>
          </form>
        )}

        {/* Links List */}
        {links.length === 0 ? (
          <div className="text-center py-8 text-zinc-500">
            <p>등록된 링크가 없습니다.</p>
            <Button
              onClick={() => {
                setIsAdding(true);
                setFormData({
                  ...formData,
                  display_order: links.length,
                });
              }}
              className="mt-4 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              링크 추가하기
            </Button>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='links'>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className='space-y-2'
                >
                  {links.map((link, index) => (
                    <Draggable
                      key={link.id}
                      draggableId={link.id}
                      index={index}
                      isDragDisabled={!!editingId || isAdding}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
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
                            className={editingId || isAdding ? 'cursor-not-allowed' : 'cursor-grab'}
                          >
                            <GripVertical className="h-5 w-5 text-zinc-400" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-white">{link.label}</div>
                            <div className="text-sm text-zinc-400">{link.url}</div>
                            {link.description && (
                              <div className="text-sm text-zinc-500 line-clamp-1">{link.description}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(link)}
                              disabled={!!editingId || isAdding}
                              className="hover:bg-white/10 text-zinc-400 hover:text-white"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => confirmDelete(link.id)}
                              disabled={!!editingId || isAdding}
                              className="hover:bg-red-500/10 text-zinc-400 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
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
        )}
      </CardContent>

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="링크 삭제"
        description="이 링크를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      />
    </Card>
  );
}