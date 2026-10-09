import styled from "styled-components";
import { Flex } from "src/shared/ui/ui-kit/Flex";

export const Root = styled(Flex)`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;
