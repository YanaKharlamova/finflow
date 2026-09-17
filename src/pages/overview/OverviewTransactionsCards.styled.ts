import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { Flex } from "src/shared/ui/ui-kit/Flex";

export const Root = styled(Flex).attrs({
  direction: "column",
  gap: "sm",
})`
  min-width: 0;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    flex-flow: row wrap;
    gap: ${({ theme }) => theme.spacing.md};

    > :first-child {
      flex-basis: 100%;
    }
  }

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    flex-wrap: nowrap;

    > :first-child {
      flex-basis: 0;
    }
  }
`;
