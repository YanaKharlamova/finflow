import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

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
  margin-bottom: ${({ theme }) => theme.spacing.sm};
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
