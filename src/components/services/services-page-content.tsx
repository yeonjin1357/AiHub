'use client';

import { useState, useEffect } from 'react';
import { ServiceCard } from './service-card';
import { CategoryFilter } from './category-filter';
import { PricingTypeFilter } from './pricing-type-filter';
import { ServiceSearch } from './service-search';
import { ServiceSort } from './service-sort';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getServices,
  getCategories,
  AIService,
  Category,
} from '@/lib/api/services';

export function ServicesPageContent() {
  const [services, setServices] = useState<AIService[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredServices, setFilteredServices] = useState<AIService[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'featured' | 'freemium'>(
    'featured'
  );
  const [selectedPricingType, setSelectedPricingType] = useState<'all' | 'freemium' | 'paid'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, categoriesData] = await Promise.all([
          getServices(),
          getCategories(),
        ]);

        setServices(servicesData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 필터링 및 정렬
  useEffect(() => {
    let filtered = services;

    // 카테고리 필터
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (service) => service.category_id === selectedCategory
      );
    }

    // 가격 타입 필터
    if (selectedPricingType !== 'all') {
      filtered = filtered.filter((service) => {
        return service.pricing_type === selectedPricingType;
      });
    }

    // 검색 필터
    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return a.name.localeCompare(b.name);
        case 'freemium':
          if (a.pricing_type === 'freemium' && b.pricing_type !== 'freemium') return -1;
          if (a.pricing_type !== 'freemium' && b.pricing_type === 'freemium') return 1;
          return a.name.localeCompare(b.name);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredServices(filtered);
  }, [services, selectedCategory, selectedPricingType, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* 헤더 섹션 */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl'>
            AI 서비스 카탈로그
          </h1>
          <p className='mt-3 text-xl text-gray-500 dark:text-gray-400'>
            최고의 AI 도구들을 한눈에 비교하고 찾아보세요
          </p>
          <p className='mt-2 text-sm text-gray-400 dark:text-gray-500'>
            총 {services.length}개의 AI 서비스 • 검색 결과 {filteredServices.length}개
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700'>
          <div className='flex flex-col lg:flex-row gap-4'>
            {/* 검색 */}
            <div className='flex-1'>
              <ServiceSearch
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder='서비스명이나 설명으로 검색...'
              />
            </div>

            {/* 정렬 */}
            <div className='flex gap-2'>
              <ServiceSort value={sortBy} onChange={setSortBy} />

              {/* 뷰 모드 */}
              <div className='flex rounded-lg border border-gray-300 dark:border-gray-600'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-lg ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>

              {/* 모바일 필터 토글 */}
              <Button
                variant='outline'
                onClick={() => setShowFilters(!showFilters)}
                className='lg:hidden'
              >
                <Filter size={20} className='mr-2' />
                필터
              </Button>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* 사이드바 필터 */}
          <div
            className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              services={services}
            />
          </div>

          {/* 서비스 그리드 */}
          <div className='flex-1'>
            {/* 가격 유형 필터 */}
            <PricingTypeFilter
              selectedPricingType={selectedPricingType}
              onPricingTypeChange={setSelectedPricingType}
              services={services}
            />
            
            {filteredServices.length === 0 ? (
              <div className='text-center py-12'>
                <Search className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='mt-4 text-lg font-medium text-gray-900 dark:text-white'>
                  검색 결과가 없습니다
                </h3>
                <p className='mt-2 text-gray-500 dark:text-gray-400'>
                  다른 키워드로 검색해보거나 필터를 변경해보세요.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    category={categories.find(
                      (c) => c.id === service.category_id
                    )}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
