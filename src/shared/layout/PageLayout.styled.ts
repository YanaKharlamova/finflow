import styled from "styled-components";
import { Flex } from "src/shared/ui/ui-kit/Flex";

export const Root = styled(Flex)`
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.background};
`;

export const PageContentContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
`;
