export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

export function formatDateYearMonth(date: string | Date): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long'
  }).format(d)
}