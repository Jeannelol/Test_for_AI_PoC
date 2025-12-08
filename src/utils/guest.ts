export function generateGuestId(): string {
  const suffix = Math.random().toString(36).slice(2, 8); // 6 chars a-z0-9
  return `GUEST-${suffix}`;
}
