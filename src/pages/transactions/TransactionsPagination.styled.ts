import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { cardStyles } from "src/pages/transactions/TransactionsTable.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Button } from "src/shared/ui/ui-kit/Button";

export const Root = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  ${cardStyles};

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const PageStatus = styled(Typography)`
  text-align: center;
  white-space: nowrap;
`;

export const PaginationButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    padding: 10px ${({ theme }) => theme.spacing.md};
  }
`;
