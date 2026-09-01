import styled, { css } from "styled-components";

export type BadgeVariant = "primary" | "danger" | "tertiary";

const variantStyles = {
  primary: css`
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  `,
  danger: css`
    color: ${({ theme }) => theme.colors.danger};
    border-color: ${({ theme }) => theme.colors.danger};
  `,
  tertiary: css`
    color: ${({ theme }) => theme.colors.tertiary};
    background-color: ${({ theme }) => theme.colors.tertiaryBackground};
    border: none;
  `,
};

export const BadgeStyled = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  padding: 5px ${({ theme }) => theme.spacing.sm};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: 400;
  line-height: ${({ theme }) => theme.typography.caption.lineHeight};
  white-space: nowrap;

  ${({ $variant }) => variantStyles[$variant]};
`;
