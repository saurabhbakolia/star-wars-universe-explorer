/**
 * Extract ID from SWAPI URL
 */
export function extractIdFromUrl(url: string): string {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? match[1] : '';
}

/**
 * Format number with commas
 */
export function formatNumber(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return value.toString();
  return num.toLocaleString();
}

/**
 * Format date string
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      func(...(args as any));
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
