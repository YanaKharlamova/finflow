import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

export const DateFilter = styled.div`
  min-width: 0;

  @media (max-width: ${BREAKPOINTS.mobileMd}px) {
    grid-column: span 2;
  }
`;

export const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${BREAKPOINTS.mobileMd}px) {
    > button:last-child {
      grid-column: span 2;
    }
  }

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    grid-template-columns:
      repeat(3, minmax(160px, max-content)) 1fr
      minmax(160px, max-content);

    > :last-child {
      grid-column: 5;
    }
  }
`;
