import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

export const Root = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const SelectionStyled = styled.select`
  min-width: 50px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.surface};
  font: inherit;
  cursor: pointer;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.buttonFocus};
    outline-offset: 2px;
  }
`;
