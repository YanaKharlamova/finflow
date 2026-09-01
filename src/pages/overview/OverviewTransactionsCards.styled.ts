import styled from "styled-components";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

export const Root = styled(Flex)`
  min-width: 0;
  margin: 10px;

  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    flex-flow: row wrap;
    gap: ${({ theme }) => theme.spacing.md};

    > * {
      flex: 1;
    }

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
