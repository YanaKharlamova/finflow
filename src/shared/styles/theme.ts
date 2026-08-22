export const theme = {
  colors: {
    background: "#f5f7fb",
    surface: "#ffffff",
    primary: "#142b5f",
    textPrimary: "#17223b",
    textSecondary: "#68758f",
    border: "#dbe3f0",
    interactiveHover: "#e9eef7",
    interactiveFocus: "#dfe7f5",
    focusRing: "#4969a8",
  },

  typography: {
    pageTitle: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: 1.2,
    },
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
  },

  radii: {
    sm: "6px",
    md: "10px",
  },

  transitions: {
    fast: "150ms ease",
    normal: "250ms ease",
    slow: "300ms ease-in-out",
  },
} as const;
