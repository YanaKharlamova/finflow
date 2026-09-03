import styled, { css } from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { Badge } from "src/shared/ui/ui-kit/Badge";

const cellStyles = css`
  padding: 0;
  text-align: left;

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    padding: 20px ${({ theme }) => theme.spacing.lg};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    vertical-align: middle;
  }
`;

export const TableStyled = styled.table`
  display: block;
  width: 100%;
  border-collapse: collapse;

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    display: table;
    table-layout: fixed;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    border-spacing: 0;
    border-collapse: separate;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.white};
  }
`;

export const TableHead = styled.thead`
  display: none;

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    display: table-header-group;
  }
`;

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

export const TableBody = styled.tbody`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    display: table-row-group;
  }
`;

export const TableRow = styled.tr`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 20px ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.white};

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    display: table-row;

    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export const DateCell = styled.td`
  ${cellStyles};
  order: 3;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    white-space: nowrap;
  }
`;

export const TransactionCell = styled.th`
  ${cellStyles};
  order: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;

  & > span:first-child {
    min-width: 0;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    display: table-cell;
    white-space: nowrap;

    & > span:first-child {
      display: inline-block;
      max-width: calc(100% - 80px);
      vertical-align: middle;
    }
  }
`;

export const CategoryCell = styled.td`
  ${cellStyles};
  order: 2;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: capitalize;
`;

export const AmountCell = styled.td<{ $danger?: boolean }>`
  ${cellStyles};
  order: 4;
  font-weight: 500;
  align-self: flex-end;
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.danger : theme.colors.success};

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    text-align: right;
    white-space: nowrap;
  }
`;

export const ActionsCell = styled.td`
  ${cellStyles};
  order: 5;
  align-self: flex-start;

  &:last-of-type {
    display: flex;
    justify-content: flex-end;
  }

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    text-align: left;
  }
`;

export const MobileLabel = styled.span`
  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    display: none;
  }
`;

export const TypeBadge = styled(Badge)`
  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

export const ActionButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.danger};
  background: ${({ theme }) => theme.colors.dangerBackground};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.danger};
  }
`;
