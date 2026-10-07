import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { ErrorMessage } from "src/shared/ui/ui-kit/FormControl.styled";

export const DateFilter = styled.div`
  position: relative;
  min-width: 0;

  ${ErrorMessage} {
    position: absolute;
    inset-block-start: calc(100% + 2px);
    inset-inline: 0;
    margin-block-start: 0;
  }

  @media (width < ${BREAKPOINTS.mobileLg}px) {
    grid-column: span 2;
    order: 1;
  }
`;

export const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  padding-block-end: 4px;

  gap: ${({ theme }) => theme.spacing.sm};

  @media (width < ${BREAKPOINTS.mobileLg}px) {
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
