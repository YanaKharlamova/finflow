import styled from "styled-components";
import { Flex } from "src/shared/ui/ui-kit/Flex";

export const Root = styled(Flex)`
  min-height: 100%;
  background: ${({ theme }) => theme.colors.background};
`;

export const PageContentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  flex: 1;
  margin-inline: auto;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;
