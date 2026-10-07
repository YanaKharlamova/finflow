import styled, { css } from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "default" | "compact";

const variantStyles = {
  primary: css`
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.primary};

    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
      border-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.white};

    &:hover {
      background: ${({ theme }) => theme.colors.secondaryHover};
      border-color: ${({ theme }) => theme.colors.secondaryHover};
    }
  `,
  danger: css`
    border-color: ${({ theme }) => theme.colors.dangerBackground};
    color: ${({ theme }) => theme.colors.danger};
    background: ${({ theme }) => theme.colors.dangerBackground};

    &:hover {
      color: ${({ theme }) => theme.colors.white};
      background: ${({ theme }) => theme.colors.danger};
      border-color: ${({ theme }) => theme.colors.danger};
    }
  `,
};

const sizeStyles = {
  default: css`
    padding: 8px 12px;

    @media (min-width: ${BREAKPOINTS.mobileLg}px) {
      padding: 10px 16px;
    }
  `,
  compact: css`
    padding: 8px;

    @media (min-width: ${BREAKPOINTS.mobileLg}px) {
      padding: 10px;
    }
  `,
};

export const ButtonStyled = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $shimmer: boolean;
}>`
  border: 2px solid;
  border-radius: ${({ theme }) => theme.radii.sm};
  font: inherit;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $variant }) => variantStyles[$variant]};
  ${({ $size }) => sizeStyles[$size]};

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryFocus};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    font-size: inherit;
  }

  ${({ $shimmer, theme }) =>
    $shimmer &&
    css`
      & {
        color: transparent;
        border-color: transparent;
        background: ${theme.colors.secondaryHover};
        cursor: default;
        user-select: none;
      }

      &:hover {
        color: transparent;
        border-color: transparent;
        background: ${theme.colors.secondaryHover};
      }

      &:disabled {
        opacity: 1;
        cursor: default;
      }
    `};
`;
