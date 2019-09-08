
export function getTime(date?: Date): number {
  return date != null ? date.getTime() : 0;
}
