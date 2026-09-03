import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { FinflowLogo } from "src/shared/ui/icons/FinflowLogo";

export const Root = styled.header`
  grid-row: 1;
  grid-column: 1 / -1;
  box-sizing: border-box;
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs}`};
  background: ${({ theme }) => theme.colors.white};

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    padding: 10px 12px;
  }
`;

export const Brand = styled(FinflowLogo)`
  width: 108px;
  height: 32px;
  flex: 0 0 108px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const PageTitle = styled.div`
  display: none;
  margin-left: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    display: block;
  }
`;
