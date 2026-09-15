import styled from "styled-components";
import { cellStyles } from "src/pages/transactions/TransactionsTable.styled";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

export const HeaderCell = styled.th<{
  $align: "left" | "right";
  $width: number;
}>`
  ${cellStyles};
  text-align: ${({ $align }) => $align};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: 600;
  width: ${({ $width }) => $width}%;
`;

export const TableHead = styled.thead`
  display: none;

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    display: table-header-group;
  }
`;
