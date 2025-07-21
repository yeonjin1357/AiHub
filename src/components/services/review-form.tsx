'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

interface ReviewFormProps {
  serviceId: string;
  onReviewSubmitted: () => void;
}

export function ReviewForm({ serviceId, onReviewSubmitted }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (rating === 0) {
      toast.error('별점을 선택해주세요.');
      return;
    }

    if (comment.trim().length < 10) {
      toast.error('리뷰는 최소 10자 이상 작성해주세요.');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('리뷰를 작성하는 중...');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          rating,
          comment: comment.trim(),
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setRating(0);
        setComment('');
        onReviewSubmitted();
        toast.success('리뷰가 성공적으로 작성되었습니다.');
      } else {
        toast.error(responseData.error || '리뷰 작성에 실패했습니다.');
      }
    } catch (error) {
      toast.error('리뷰 작성 중 오류가 발생했습니다.');
    } finally {
      toast.dismiss(loadingToast);
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card className='border-gray-200 shadow-sm'>
        <CardContent className='p-8 text-center'>
          <div className='mb-4'>
            <Star className='w-12 h-12 text-gray-400 mx-auto mb-2' />
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              리뷰 작성
            </h3>
            <p className='text-gray-600'>
              이 서비스에 대한 리뷰를 작성하려면 로그인이 필요합니다.
            </p>
          </div>
          <Button asChild>
            <Link href='/signin'>로그인하기</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='border-gray-200 shadow-sm'>
      <CardHeader>
        <CardTitle className='text-lg'>리뷰 작성</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* 별점 선택 */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              별점 *
            </label>
            <div className='flex items-center gap-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className='p-1 rounded transition-colors hover:bg-gray-100'
                >
                  <Star
                    size={24}
                    className={`transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className='ml-2 text-sm text-gray-600'>{rating}점</span>
              )}
            </div>
          </div>

          {/* 리뷰 내용 */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              리뷰 내용 *
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='이 서비스에 대한 경험을 자세히 공유해주세요. (최소 10자)'
              rows={4}
              className='resize-none'
              maxLength={1000}
            />
            <div className='flex justify-between items-center mt-1'>
              <span className='text-xs text-gray-500'>
                최소 10자 이상 작성해주세요.
              </span>
              <span className='text-xs text-gray-500'>
                {comment.length}/1000
              </span>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className='flex justify-end'>
            <Button
              type='submit'
              disabled={
                isSubmitting || rating === 0 || comment.trim().length < 10
              }
              className='flex items-center gap-2'
            >
              {isSubmitting ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <Send className='w-4 h-4' />
              )}
              {isSubmitting ? '작성 중...' : '리뷰 작성'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
