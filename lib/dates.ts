// Formats a Date or ISO string into "Nov 20, 2026"
export function formatSessionDate(dateInput: Date | string): string {
  return new Date(dateInput).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Formats start and end times into "06:00 PM – 07:30 PM"
export function formatSessionTimeRange(
  startInput: Date | string,
  endInput: Date | string
): string {
  const start = new Date(startInput).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const end = new Date(endInput).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${start} – ${end}`;
}
