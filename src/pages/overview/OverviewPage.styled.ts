import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

export const Root = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;
