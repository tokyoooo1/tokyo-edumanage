export function formatDate(value, options = {}) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    ...options,
  }).format(new Date(value))
}
