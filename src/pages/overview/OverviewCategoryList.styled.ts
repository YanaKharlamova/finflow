import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

export const Root = styled.ul`
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;

  > li {
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  > li:last-child {
    border-bottom: 0;
  }

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    width: auto;
    max-width: 600px;
    flex: 0 1 52%;
  }
`;

export const Bullet = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  flex: 0 0 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;
