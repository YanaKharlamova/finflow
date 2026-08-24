import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

export const Root = styled.header`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 4px`};

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    padding: ${({ theme }) => `${theme.spacing.md}`};
  }
`;

export const PageTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PageNameBox = styled.div`
  display: flex;
  align-items: center;
`;
