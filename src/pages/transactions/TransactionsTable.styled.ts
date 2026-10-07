import styled, { css } from "styled-components";
import { Popover } from "radix-ui";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { Badge } from "src/shared/ui/ui-kit/Badge";

export const cellStyles = css`
  padding: 0;
  text-align: left;

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    padding: 20px ${({ theme }) => theme.spacing.lg};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    vertical-align: middle;
  }
`;

export const cardStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.white};
`;

export const TableStyled = styled.table`
  display: block;
  width: 100%;
  border-collapse: collapse;

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    display: table;
    table-layout: fixed;
    ${cardStyles};
    border-spacing: 0;
    border-collapse: separate;
    overflow: hidden;
  }
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
  ${cardStyles};

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

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    padding-inline: ${({ theme }) => theme.spacing.sm};
  }
`;

export const DeleteErrorTrigger = styled(Popover.Trigger)`
  all: unset;
  height: 20px;
  flex: 0 0 20px;
  order: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.danger};
  visibility: ${({ disabled }) => (disabled ? "hidden" : "visible")};
  cursor: pointer;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryFocus};
  }

  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    order: 0;
  }
`;

export const CategoryLabel = styled.span`
  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    display: none;
  }
`;

export const TypeBadge = styled(Badge)`
  @media (min-width: ${BREAKPOINTS.tabletLg}px) {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;
