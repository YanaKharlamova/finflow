import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary";

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
};

export const ButtonStyled = styled.button<{ $variant: ButtonVariant }>`
  padding: 10px 16px;
  border: 2px solid;
  border-radius: ${({ theme }) => theme.radii.sm};
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $variant }) => variantStyles[$variant]};

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
`;
