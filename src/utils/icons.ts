export const iconMap = {
  Facebook: 'mdi:facebook',
  X: 'line-md:twitter-x',
  Instagram: 'mdi:instagram',
} as const;

export const getIcon = (iconName: string, props?: React.SVGProps<SVGSVGElement>) => {
  const icon = iconMap[iconName as keyof typeof iconMap] || null;

  return icon;
};
