import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

export const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, auto);
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    grid-template-columns:
      repeat(3, minmax(160px, max-content)) 1fr
      minmax(160px, max-content);
    grid-template-rows: repeat(1, auto);

    > :last-child {
      grid-column: 5;
    }
  }
`;
