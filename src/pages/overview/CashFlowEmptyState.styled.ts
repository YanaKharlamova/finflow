import styled from "styled-components";
import { Flex } from "src/shared/ui/ui-kit/Flex";

export const Root = styled(Flex)`
  box-sizing: border-box;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};

  > svg {
    width: 40px;
    height: 40px;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.primary};
  }

  > button {
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;
