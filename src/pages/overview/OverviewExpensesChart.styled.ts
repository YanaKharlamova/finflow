import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import styled from "styled-components";
import { Chart } from "src/pages/overview/OverviewCashFlowCharts.styled";
import { Flex } from "src/shared/ui/ui-kit/Flex";

export const Content = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    flex-direction: row;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CategoryChart = styled(Chart)`
  width: 100%;
  flex: none;

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    width: auto;
    flex: 0 0 30%;
  }
`;

export const CategoryListSkeleton = styled.div`
  width: 100%;
  height: 196px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.secondaryHover};

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    max-width: 600px;
    flex: 0 1 52%;
  }
`;

export const ChartTotal = styled(Flex)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
`;
