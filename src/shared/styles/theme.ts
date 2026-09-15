export const theme = {
  colors: {
    background: "rgb(245 247 251 / 0.55)",
    white: "#ffffff",
    primary: "#142b5f",
    primaryHover: "#4969a8",
    primaryFocus: "#4969a8",
    secondary: "#f5f7fb",
    secondaryHover: "#e9eef7",
    secondaryFocus: "#dfe7f5",
    tertiary: "#294f7d",
    tertiaryBackground: "#eaf4ff",
    textPrimary: "#17223b",
    textSecondary: "#68758f",
    border: "#dbe3f0",
    success: "#206c50",
    successBackground: "#edf5f1",
    danger: "#9b4a45",
    dangerBackground: "#f8eeee",
  },

  typography: {
    pageTitle: {
      fontSize: "26px",
      fontWeight: 600,
      lineHeight: "28px",
    },
    pageTitleSm: {
      fontSize: "24px",
      fontWeight: 500,
      lineHeight: "24px",
    },
    title: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "24px",
    },
    subtitle: {
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "24px",
    },
    caption: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
    },
    bodyText: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
    },
    inherit: {
      fontSize: "inherit",
      fontWeight: "inherit",
      lineHeight: "inherit",
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
