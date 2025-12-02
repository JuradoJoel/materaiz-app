export const formatText = (text?: string): string => {
  if (!text) return '';

  const lower = text.toLowerCase().trim();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};
