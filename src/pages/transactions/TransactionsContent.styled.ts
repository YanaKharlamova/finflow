import styled from "styled-components";
import { Flex } from "src/shared/ui/ui-kit/Flex";

export const NoTransactionsWrapper = styled(Flex)`
  flex: 1;
  width: 100%;

  svg {
    width: 50px;
    height: 50px;
  }
`;

export const TextWrapper = styled(Flex)`
  max-width: 300px;
  margin: 0 20px;
  text-align: center;
`;
