import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.background};
  gap: 5px;
`;
