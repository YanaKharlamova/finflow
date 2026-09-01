import styled from "styled-components";
import { Flex } from "src/shared/ui/ui-kit/Flex";

export const Root = styled(Flex)`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.white};

  & > div:first-child {
    min-height: 32px;
  }
`;
