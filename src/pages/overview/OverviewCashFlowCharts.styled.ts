import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { Flex } from "src/shared/ui/ui-kit/Flex";

export const Root = styled.section`
  box-sizing: border-box;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.white};

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Chart = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  flex: 1;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    height: 350px;
  }
`;

export const ChartContent = styled.div<{ $fetching: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ $fetching }) => ($fetching ? 0.6 : 1)};
  filter: ${({ $fetching }) => ($fetching ? "blur(1px)" : "none")};
  pointer-events: ${({ $fetching }) => ($fetching ? "none" : "auto")};
  transition:
    opacity ${({ theme }) => theme.transitions.fast},
    filter ${({ theme }) => theme.transitions.fast};
`;

export const ChartSkeleton = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.secondaryHover};
`;

export const ChartState = styled(Flex)`
  height: 100%;
  text-align: center;
`;
