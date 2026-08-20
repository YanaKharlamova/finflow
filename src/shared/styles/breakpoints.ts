export const BREAKPOINTS = {
  tablet: 768,
} as const;

export const MEDIA = {
  tablet: `(max-width: ${BREAKPOINTS.tablet}px)`,
  desktop: `(min-width: ${BREAKPOINTS.tablet + 1}px)`,
} as const;
