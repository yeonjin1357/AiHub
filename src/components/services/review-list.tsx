'use client';

import { useState, useEffect } from 'react';
import { Star, User, Calendar, MoreVertical, ChevronDown, ChevronUp, Trash2, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id?: string;
  is_own_review?: boolean;
  user: {
    name: string;
    email: string;
  };
}

interface ReviewStats {
  total_reviews: number;
  average_rating: number;
  rating_counts: Array<{
    rating: number;
    count: number;
  }>;
}

interface ReviewListProps {
  serviceId: string;
  refreshTrigger?: number;
  onReviewDeleted?: () => void;
}

export function ReviewList({ serviceId, refreshTrigger = 0, onReviewDeleted }: ReviewListProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    total_reviews: 0,
    average_rating: 0,
    rating_counts: []
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  const fetchReviews = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews?service_id=${serviceId}&page=${pageNum}&limit=10`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (append) {
          setReviews(prev => [...prev, ...data.reviews]);
        } else {
          setReviews(data.reviews);
        }
        
        setStats(data.stats);
        setHasMore(data.pagination.has_more);
      } else {
        // Failed to fetch reviews
      }
    } catch (error) {
      // Error handled by UI state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 로그인된 사용자만 리뷰를 불러옴
    if (user) {
      fetchReviews(1, false);
      setPage(1);
    } else {
      // 비로그인 사용자는 통계만 불러옴
      fetchReviewStats();
    }
  }, [serviceId, refreshTrigger, user]);

  const fetchReviewStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews?service_id=${serviceId}&page=1&limit=1`);
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      // Error handled by UI state
    } finally {
      setLoading(false);
    }
  };

  const loadMoreReviews = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchReviews(nextPage, true);
  };

  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const handleDeleteClick = (reviewId: string) => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    setReviewToDelete(reviewId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reviewToDelete) return;

    setDeletingReviewId(reviewToDelete);

    try {
      const response = await fetch(`/api/reviews?id=${reviewToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('리뷰가 성공적으로 삭제되었습니다.');
        // 리뷰 목록 새로고침
        fetchReviews(1, false);
        setPage(1);
        // 상단 통계 업데이트 콜백 호출
        onReviewDeleted?.();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || '리뷰 삭제에 실패했습니다.');
      }
    } catch (error) {
      toast.error('리뷰 삭제 중 오류가 발생했습니다.');
    } finally {
      setDeletingReviewId(null);
      setReviewToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number, size = 16) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={size}
        className={`${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const getRatingPercentage = (rating: number) => {
    if (stats.total_reviews === 0) return 0;
    const count = stats.rating_counts.find(r => r.rating === rating)?.count || 0;
    return (count / stats.total_reviews) * 100;
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="space-y-6">
        {/* 로딩 스켈레톤 */}
        <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 비로그인 사용자를 위한 리뷰 제한 UI
  if (!user) {
    return (
      <div className="space-y-6">
        {/* 리뷰 통계는 표시 */}
        <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">리뷰 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* 전체 평점 */}
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.average_rating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(stats.average_rating), 20)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stats.total_reviews}개의 리뷰
                </div>
              </div>

              {/* 별점 분포 */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm">{rating}</span>
                      <Star size={12} className="text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all duration-300"
                        style={{ width: `${getRatingPercentage(rating)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                      {stats.rating_counts.find(r => r.rating === rating)?.count || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 비로그인 사용자 리뷰 제한 UI */}
        <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                리뷰를 확인하려면 로그인이 필요합니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                다른 사용자들의 실제 경험과 의견을 확인해보세요
              </p>
            </div>
            <Button asChild size="lg">
              <a href="/signin">로그인하고 리뷰 보기</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 리뷰 통계 */}
      <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">리뷰 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 전체 평점 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stats.average_rating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(stats.average_rating), 20)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stats.total_reviews}개의 리뷰
              </div>
            </div>

            {/* 별점 분포 */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{rating}</span>
                    <Star size={12} className="text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all duration-300"
                      style={{ width: `${getRatingPercentage(rating)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                    {stats.rating_counts.find(r => r.rating === rating)?.count || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 리뷰 목록 */}
      <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            사용자 리뷰 ({stats.total_reviews})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                아직 리뷰가 없습니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                이 서비스에 대한 첫 번째 리뷰를 작성해보세요!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => {
                const isExpanded = expandedReviews.has(review.id);
                const shouldShowToggle = review.comment.length > 200;

                return (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <User size={20} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {review.user.name}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar size={12} />
                            {formatDate(review.created_at)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {review.rating}점
                          </Badge>
                        </div>
                        
                        {/* 본인 리뷰인 경우 삭제 버튼 표시 */}
                        {review.is_own_review && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(review.id)}
                            disabled={deletingReviewId === review.id}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2"
                            title="리뷰 삭제"
                          >
                            {deletingReviewId === review.id ? (
                              <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="ml-13">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {shouldShowToggle && !isExpanded
                          ? `${review.comment.substring(0, 200)}...`
                          : review.comment}
                      </p>
                      
                      {shouldShowToggle && (
                        <button
                          onClick={() => toggleReviewExpansion(review.id)}
                          className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 flex items-center gap-1"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp size={14} />
                              접기
                            </>
                          ) : (
                            <>
                              <ChevronDown size={14} />
                              더 보기
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {hasMore && (
                <div className="text-center pt-4">
                  <Button
                    variant="outline"
                    onClick={loadMoreReviews}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                        로딩 중...
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        더 많은 리뷰 보기
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="리뷰 삭제"
        description="정말로 이 리뷰를 삭제하시겠습니까? 삭제된 리뷰는 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        variant="destructive"
        onConfirm={handleDeleteConfirm}
        loading={deletingReviewId === reviewToDelete}
      />
    </div>
  );
}