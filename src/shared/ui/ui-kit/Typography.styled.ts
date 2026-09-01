import styled from "styled-components";
import type { theme } from "src/shared/styles/theme";
export type TypographyVariant = keyof typeof theme.typography;

type TypographyTextProps = {
  $variant: TypographyVariant;
};

export const TypographyText = styled.p<TypographyTextProps>`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme, $variant }) => theme.typography[$variant].fontSize};
  font-weight: ${({ theme, $variant }) =>
    theme.typography[$variant].fontWeight};
  line-height: ${({ theme, $variant }) =>
    theme.typography[$variant].lineHeight};
`;
