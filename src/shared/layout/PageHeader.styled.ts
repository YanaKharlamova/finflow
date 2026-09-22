import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { FinflowLogo } from "src/shared/ui/icons/FinflowLogo";
import { FinflowLogoSmall } from "src/shared/ui/icons/FinflowLogoSmall";
import { Button } from "src/shared/ui/ui-kit/Button";

export const Root = styled.header`
  grid-row: 1;
  grid-column: 1 / -1;
  box-sizing: border-box;
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 10px ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.white};
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Brand = styled(FinflowLogo)`
  width: 108px;
  height: 32px;
  flex: 0 0 108px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const BrandSmall = styled(FinflowLogoSmall)`
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const PageTitle = styled.div`
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

export const Actions = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const DemoDataButton = styled(Button)`
  flex: 0 0 auto;
  padding-inline: ${({ theme }) => theme.spacing.sm};
  white-space: nowrap;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    padding-inline: 16px;
  }
`;
