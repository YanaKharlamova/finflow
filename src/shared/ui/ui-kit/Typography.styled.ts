import styled from "styled-components";
import type { theme } from "src/shared/styles/theme";

export type TypographyVariant = keyof typeof theme.typography;
export type TypographyColor = "primary" | "secondary" | "danger" | "success";

const colorMap = {
  primary: "textPrimary",
  secondary: "textSecondary",
  danger: "danger",
  success: "success",
} as const;

type TypographyTextProps = {
  $variant: TypographyVariant;
  $color: TypographyColor;
};

export const TypographyText = styled.p<TypographyTextProps>`
  margin: 0;
  color: ${({ theme, $color }) => theme.colors[colorMap[$color]]};
  font-size: ${({ theme, $variant }) => theme.typography[$variant].fontSize};
  font-weight: ${({ theme, $variant }) =>
    theme.typography[$variant].fontWeight};
  line-height: ${({ theme, $variant }) =>
    theme.typography[$variant].lineHeight};
`;
