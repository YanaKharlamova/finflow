import styled from "styled-components";

import { NoResultsIcon } from "src/shared/ui/icons/NoResultsIcon";
import { Flex } from "src/shared/ui/ui-kit/Flex";

export const Root = styled(Flex)`
  flex: 1;
  padding-block: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const NotFoundIcon = styled(NoResultsIcon)`
  width: 64px;
  height: 64px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
