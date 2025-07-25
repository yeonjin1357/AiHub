'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('문의가 전송되었습니다');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setSubmitStatus('idle');
      } else {
        toast.error('전송 실패. 다시 시도해주세요');
        setSubmitStatus('error');
      }
    } catch (error) {
      toast.error('전송 실패. 다시 시도해주세요');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'error' && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-400">
            문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">이름 *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="홍길동"
            className="w-full bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:bg-white/10 focus:border-blue-500/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">이메일 *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:bg-white/10 focus:border-blue-500/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-white">제목 *</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="문의 제목을 입력해주세요"
          className="w-full bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:bg-white/10 focus:border-blue-500/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white">메시지 *</Label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="문의 내용을 자세히 입력해주세요. 서비스 추가 요청, 정보 수정, 기능 개선 제안 등 무엇이든 환영합니다."
          rows={6}
          className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white rounded-md shadow-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent focus:bg-white/10 resize-none transition-all"
        />
      </div>

      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-zinc-500">
          * 필수 입력 항목
        </p>
        <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0">
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              전송 중...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              문의 전송
            </>
          )}
        </Button>
      </div>
    </form>
  );
}