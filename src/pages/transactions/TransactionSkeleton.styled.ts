import styled from "styled-components";

import { TableRow } from "src/pages/transactions/TransactionsTable.styled";

export const TransactionSkeletonRow = styled(TableRow)`
  pointer-events: none;
`;

export const SkeletonTime = styled.time`
  color: transparent;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.secondaryHover};
  user-select: none;
`;
