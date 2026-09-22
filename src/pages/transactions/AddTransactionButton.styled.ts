import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

export const ButtonStyled = styled.button`
  padding: 10px;
  min-width: 44px;
  min-height: 44px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryFocus};
  }

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    padding: 10px 16px;
  }
`;

export const MobileLabel = styled.span`
  display: inline;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    display: none;
  }
`;

export const WideLabel = styled.span`
  display: none;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    display: inline;
  }
`;
