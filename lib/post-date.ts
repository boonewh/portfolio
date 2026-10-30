// Frontmatter publication dates are calendar dates, independent of visitor timezone.
export function formatPostDate(date: string, month: 'short' | 'long' = 'short'): string {
  return new Date(date).toLocaleDateString('en-US', {
    month, day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
}
