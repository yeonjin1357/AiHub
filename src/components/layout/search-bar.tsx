'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from '@/hooks/use-debounce';
interface SearchResult {
id: string;
name: string;
slug: string;
short_description: string;
logo_url: string;
category: {
name: string;
slug: string;
};
pricing_type: string;
}
export function SearchBar() {
const [query, setQuery] = useState('');
const [results, setResults] = useState<SearchResult[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [selectedIndex, setSelectedIndex] = useState(-1);
const debouncedQuery = useDebounce(query, 300);
const router = useRouter();
const searchRef = useRef<HTMLDivElement>(null);
const inputRef = useRef<HTMLInputElement>(null);
// 외부 클릭 시 검색 결과 닫기
useEffect(() => {
const handleClickOutside = (event: MouseEvent) => {
if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
setIsOpen(false);
setSelectedIndex(-1);
}
};
document.addEventListener('mousedown', handleClickOutside);
return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
// 검색 실행
useEffect(() => {
const searchServices = async () => {
if (!debouncedQuery.trim()) {
setResults([]);
setIsOpen(false);
return;
}
setIsLoading(true);
try {
const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
if (response.ok) {
const data = await response.json();
setResults(data);
setIsOpen(true);
setSelectedIndex(-1);
}
} catch (error) {
// Error handled by UI state
} finally {
setIsLoading(false);
}
};
searchServices();
}, [debouncedQuery]);
// 키보드 네비게이션
const handleKeyDown = (e: React.KeyboardEvent) => {
if (!isOpen || results.length === 0) return;
switch (e.key) {
case 'ArrowDown':
e.preventDefault();
setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : 0
);
break;
case 'ArrowUp':
e.preventDefault();
setSelectedIndex(prev => prev > 0 ? prev - 1 : results.length - 1
);
break;
case 'Enter':
e.preventDefault();
if (selectedIndex >= 0) {
handleResultClick(results[selectedIndex]);
}
break;
case 'Escape':
setIsOpen(false);
setSelectedIndex(-1);
inputRef.current?.blur();
break;
}
};
const handleResultClick = (result: SearchResult) => {
router.push(`/services/${result.slug}`);
setQuery('');
setIsOpen(false);
setSelectedIndex(-1);
inputRef.current?.blur();
};
const handleClear = () => {
setQuery('');
setResults([]);
setIsOpen(false);
setSelectedIndex(-1);
inputRef.current?.focus();
};
const getPricingColor = (pricingType: string) => {
switch (pricingType) {
case 'free':
return 'bg-green-500/20 text-green-400 border-green-500/30';
case 'freemium':
return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
case 'paid':
return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
default:
return 'bg-zinc-800 text-zinc-400 border-zinc-700';
}
};
const getPricingText = (pricingType: string) => {
switch (pricingType) {
case 'free':
return '무료';
case 'freemium':
return '프리미엄';
case 'paid':
return '유료';
default:
return '정보 없음';
}
};
return (
<div ref={searchRef} className="relative w-full max-w-md md:max-w-sm lg:max-w-md">
<div className="relative">
<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
<Input
ref={inputRef}
type="text"
placeholder="AI 서비스 검색..."
value={query}
onChange={(e) => setQuery(e.target.value)}
onKeyDown={handleKeyDown}
onFocus={() => {
if (results.length > 0) setIsOpen(true);
}}
className="pl-10 pr-10 bg-white/5 border-white/10 focus:border-blue-500/50 text-white placeholder:text-zinc-500 backdrop-blur-sm"
/>
{query && (
<Button
variant="ghost"
size="sm"
onClick={handleClear}
className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6 hover:bg-white/10 text-zinc-400 hover:text-white"
>
<X className="w-3 h-3" />
</Button>
)}
{isLoading && (
<Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-blue-500" />
)}
</div>
{/* 검색 결과 드롭다운 */}
{isOpen && (
<Card className="absolute top-full mt-2 w-full max-w-lg left-0 right-0 md:left-auto md:right-auto z-50 shadow-xl glass border-white/10">
<CardContent className="p-0">
{results.length > 0 ? (
<div className="max-h-96 overflow-y-auto">
{results.map((result, index) => (
<button
key={result.id}
onClick={() => handleResultClick(result)}
className={`w-full text-left p-3 hover:bg-white/5 border-b border-white/5 last:border-b-0 transition-colors ${
index === selectedIndex ? 'bg-white/10' : ''
}`}
>
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
<img
src={result.logo_url}
alt={`${result.name} logo`}
className="w-6 h-6 object-contain"
onError={(e) => {
const target = e.target as HTMLImageElement;
target.style.display = 'none';
target.nextElementSibling!.textContent = result.name.charAt(0);
}}
/>
<span className="text-xs font-bold text-zinc-400 hidden">
{result.name.charAt(0)}
</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-2 mb-1">
<h3 className="font-semibold text-white truncate">
{result.name}
</h3>
<Badge
variant="secondary"
className={`text-xs px-2 py-0.5 ${getPricingColor(result.pricing_type)}`}
>
{getPricingText(result.pricing_type)}
</Badge>
</div>
<p className="text-sm text-zinc-400 truncate">
{result.short_description}
</p>
<p className="text-xs text-zinc-500 mt-1">
{result.category.name}
</p>
</div>
</div>
</button>
))}
</div>
) : (
<div className="p-4 text-center text-zinc-500">
<Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
<p>검색 결과가 없습니다.</p>
</div>
)}
</CardContent>
</Card>
)}
</div>
);
}