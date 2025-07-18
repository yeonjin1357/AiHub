'use client';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Edit2, Trash2, Star, GripVertical, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ServiceFeatureData, DisplayServiceFeature, SERVICE_FEATURES,
convertToDisplayFeatures,
getCategoryDefaultFeatures } from '@/lib/service-features';
import { getServiceFeatures, bulkUpdateServiceFeatures,
applyDefaultFeaturesToService } from '@/lib/api/service-features';
import { toast } from 'sonner';
interface ServiceFeaturesManagerProps {
serviceId: string;
categorySlug: string;
}
export function ServiceFeaturesManager({ serviceId, categorySlug }: ServiceFeaturesManagerProps) {
const [features, setFeatures] = useState<ServiceFeatureData[]>([]);
const [displayFeatures, setDisplayFeatures] = useState<DisplayServiceFeature[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [isEditing, setIsEditing] = useState(false);
const [editingFeature, setEditingFeature] = useState<ServiceFeatureData | null>(null);
const [isDialogOpen, setIsDialogOpen] = useState(false);
// 폼 상태
const [formData, setFormData] = useState({
feature_key: '',
custom_label: '',
custom_description: '',
is_highlighted: false,
category: 'platform'
});
// 서비스 특징 로드
const loadFeatures = async () => {
try {
setIsLoading(true);
setError(null);
const data = await getServiceFeatures(serviceId);
setFeatures(data);
setDisplayFeatures(convertToDisplayFeatures(data));
} catch (error) {
console.error('Error loading features:', error);
const errorMessage = error instanceof Error ? error.message : '특징을 불러오는데 실패했습니다.';
setError(errorMessage);
toast.error(errorMessage);
} finally {
setIsLoading(false);
}
};
useEffect(() => {
loadFeatures();
}, [serviceId]);
// 기본 특징 적용
const applyDefaultFeatures = async () => {
try {
setIsLoading(true);
const success = await applyDefaultFeaturesToService(serviceId, categorySlug);
if (success) {
toast.success('기본 특징이 적용되었습니다.');
await loadFeatures();
} else {
toast.error('기본 특징 적용에 실패했습니다.');
}
} catch (error) {
console.error('Error applying default features:', error);
const errorMessage = error instanceof Error ? error.message : '기본 특징 적용에 실패했습니다.';
toast.error(errorMessage);
} finally {
setIsLoading(false);
}
};
// 드래그 앤 드롭 처리
const handleDragEnd = (result: any) => {
if (!result.destination) return;
const items = Array.from(features);
const [reorderedItem] = items.splice(result.source.index, 1);
items.splice(result.destination.index, 0, reorderedItem);
// display_order 업데이트
const updatedItems = items.map((item, index) => ({
...item,
display_order: index
}));
setFeatures(updatedItems);
setDisplayFeatures(convertToDisplayFeatures(updatedItems));
};
// 특징 추가/수정
const handleSaveFeature = () => {
if (!formData.feature_key) {
toast.error('특징을 선택해주세요.');
return;
}
if (editingFeature) {
// 수정
const updatedFeatures = features.map(feature =>
feature.id === editingFeature.id
? {
...feature,
...formData
}
: feature
);
setFeatures(updatedFeatures);
setDisplayFeatures(convertToDisplayFeatures(updatedFeatures));
} else {
// 추가
const newFeature: ServiceFeatureData = {
id: `temp-${Date.now()}`,
service_id: serviceId,
feature_key: formData.feature_key,
custom_label: formData.custom_label || undefined,
custom_description: formData.custom_description || undefined,
is_highlighted: formData.is_highlighted,
display_order: features.length,
category: formData.category
};
const updatedFeatures = [...features, newFeature];
setFeatures(updatedFeatures);
setDisplayFeatures(convertToDisplayFeatures(updatedFeatures));
}
resetForm();
setIsDialogOpen(false);
};
// 특징 삭제
const handleDeleteFeature = (id: string) => {
const updatedFeatures = features.filter(feature => feature.id !== id);
setFeatures(updatedFeatures);
setDisplayFeatures(convertToDisplayFeatures(updatedFeatures));
};
// 특징 하이라이트 토글
const toggleHighlight = (id: string) => {
const updatedFeatures = features.map(feature =>
feature.id === id
? { ...feature, is_highlighted: !feature.is_highlighted }
: feature
);
setFeatures(updatedFeatures);
setDisplayFeatures(convertToDisplayFeatures(updatedFeatures));
};
// 폼 초기화
const resetForm = () => {
setFormData({
feature_key: '',
custom_label: '',
custom_description: '',
is_highlighted: false,
category: 'platform'
});
setEditingFeature(null);
};
// 편집 모드 시작
const startEditing = (feature: ServiceFeatureData) => {
setEditingFeature(feature);
setFormData({
feature_key: feature.feature_key,
custom_label: feature.custom_label || '',
custom_description: feature.custom_description || '',
is_highlighted: feature.is_highlighted,
category: feature.category
});
setIsDialogOpen(true);
};
// 변경사항 저장
const saveChanges = async () => {
try {
setIsLoading(true);
const success = await bulkUpdateServiceFeatures(serviceId, features);
if (success) {
toast.success('특징이 저장되었습니다.');
setIsEditing(false);
await loadFeatures();
} else {
toast.error('저장에 실패했습니다.');
}
} catch (error) {
console.error('Error saving features:', error);
const errorMessage = error instanceof Error ? error.message : '저장에 실패했습니다.';
toast.error(errorMessage);
} finally {
setIsLoading(false);
}
};
// 변경사항 취소
const cancelChanges = () => {
setIsEditing(false);
loadFeatures();
};
if (isLoading) {
return (
<Card className="border-gray-200/60 shadow-sm">
<CardHeader>
<CardTitle>서비스 특징 관리</CardTitle>
</CardHeader>
<CardContent>
<div className="text-center py-8">
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
<p className="text-gray-600">로딩 중...</p>
</div>
</CardContent>
</Card>
);
}
if (error) {
return (
<Card className="border-gray-200/60 shadow-sm">
<CardHeader>
<CardTitle>서비스 특징 관리</CardTitle>
</CardHeader>
<CardContent>
<div className="text-center py-8">
<div className="text-red-500 mb-4">
<svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<p className="text-sm font-medium">오류가 발생했습니다</p>
<p className="text-xs text-gray-500 mt-1">{error}</p>
</div>
<Button onClick={loadFeatures} variant="outline" size="sm">
다시 시도
</Button>
</div>
</CardContent>
</Card>
);
}
return (
<Card className="border-gray-200/60 shadow-sm">
<CardHeader>
<CardTitle className="flex items-center justify-between">
<span>서비스 특징 관리</span>
<div className="flex gap-2">
{!isEditing ? (
<>
<Button
onClick={applyDefaultFeatures}
variant="outline"
size="sm"
>
기본 특징 적용
</Button>
<Button
onClick={() => setIsEditing(true)}
variant="outline"
size="sm"
>
<Edit2 className="h-4 w-4 mr-2" />
편집
</Button>
</>
) : (
<>
<Button
onClick={saveChanges}
size="sm"
className="bg-green-600 hover:bg-green-700"
>
<Save className="h-4 w-4 mr-2" />
저장
</Button>
<Button
onClick={cancelChanges}
variant="outline"
size="sm"
>
<X className="h-4 w-4 mr-2" />
취소
</Button>
</>
)}
</div>
</CardTitle>
</CardHeader>
<CardContent>
{isEditing && (
<div className="mb-4">
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
<DialogTrigger asChild>
<Button onClick={resetForm} className="mb-4">
<Plus className="h-4 w-4 mr-2" />
특징 추가
</Button>
</DialogTrigger>
<DialogContent className="max-w-md border-gray-200/60 bg-white">
<DialogHeader>
<DialogTitle>
{editingFeature ? '특징 수정' : '특징 추가'}
</DialogTitle>
</DialogHeader>
<div className="space-y-4">
<div>
<Label htmlFor="feature_key">특징 선택</Label>
<Select
value={formData.feature_key}
onValueChange={(value) =>
setFormData(prev => ({ ...prev, feature_key: value }))
}
>
<SelectTrigger>
<SelectValue placeholder="특징을 선택하세요" />
</SelectTrigger>
<SelectContent>
{Object.entries(SERVICE_FEATURES).map(([key, feature]) => (
<SelectItem key={key} value={key}>
{feature.label}
</SelectItem>
))}
</SelectContent>
</Select>
</div>
<div>
<Label htmlFor="custom_label">커스텀 라벨 (선택사항)</Label>
<Input
id="custom_label"
value={formData.custom_label}
onChange={(e) =>
setFormData(prev => ({ ...prev, custom_label: e.target.value }))
}
placeholder="기본 라벨을 사용하려면 비워두세요"
/>
</div>
<div>
<Label htmlFor="custom_description">커스텀 설명 (선택사항)</Label>
<Textarea
id="custom_description"
value={formData.custom_description}
onChange={(e) =>
setFormData(prev => ({ ...prev, custom_description: e.target.value }))
}
placeholder="기본 설명을 사용하려면 비워두세요"
rows={3}
/>
</div>
<div className="flex items-center space-x-2">
<Switch
id="is_highlighted"
checked={formData.is_highlighted}
onCheckedChange={(checked) =>
setFormData(prev => ({ ...prev, is_highlighted: checked }))
}
/>
<Label htmlFor="is_highlighted">주요 특징으로 표시</Label>
</div>
<div className="flex gap-2">
<Button onClick={handleSaveFeature} className="flex-1">
{editingFeature ? '수정' : '추가'}
</Button>
<Button
onClick={() => setIsDialogOpen(false)}
variant="outline"
>
취소
</Button>
</div>
</div>
</DialogContent>
</Dialog>
</div>
)}
<DragDropContext onDragEnd={handleDragEnd}>
<Droppable droppableId="features">
{(provided) => (
<div
{...provided.droppableProps}
ref={provided.innerRef}
className="space-y-2"
>
{displayFeatures.map((feature, index) => (
<Draggable
key={features[index].id}
draggableId={features[index].id}
index={index}
isDragDisabled={!isEditing}
>
{(provided) => (
<div
ref={provided.innerRef}
{...provided.draggableProps}
className={`flex items-center gap-3 p-3 border border-gray-200/60 rounded-lg bg-white/50 ${
isEditing ? 'hover:bg-gray-50/80' : ''
}`}
>
{isEditing && (
<div
{...provided.dragHandleProps}
className="text-gray-600 hover:text-gray-900"
>
<GripVertical className="h-4 w-4" />
</div>
)}
<feature.icon className="h-5 w-5 text-blue-600" />
<div className="flex-1">
<div className="flex items-center gap-2">
<span className="font-medium text-gray-900">{feature.label}</span>
{feature.isHighlighted && (
<Badge variant="secondary" className="bg-blue-100 text-blue-800">
<Star className="h-3 w-3 mr-1" />
주요
</Badge>
)}
</div>
<p className="text-sm text-gray-600">
{feature.description}
</p>
</div>
{isEditing && (
<div className="flex items-center gap-2">
<Button
onClick={() => toggleHighlight(features[index].id)}
variant="ghost"
size="sm"
>
<Star
className={`h-4 w-4 ${
feature.isHighlighted
? 'fill-yellow-400 text-yellow-400'
: 'text-gray-600'
}`}
/>
</Button>
<Button
onClick={() => startEditing(features[index])}
variant="ghost"
size="sm"
>
<Edit2 className="h-4 w-4" />
</Button>
<Button
onClick={() => handleDeleteFeature(features[index].id)}
variant="ghost"
size="sm"
className="text-red-500 hover:text-red-700"
>
<Trash2 className="h-4 w-4" />
</Button>
</div>
)}
</div>
)}
</Draggable>
))}
{provided.placeholder}
</div>
)}
</Droppable>
</DragDropContext>
{displayFeatures.length === 0 && (
<div className="text-center py-8 text-gray-500">
<p>등록된 특징이 없습니다.</p>
<p className="text-sm">기본 특징을 적용하거나 직접 추가해보세요.</p>
</div>
)}
</CardContent>
</Card>
);
}