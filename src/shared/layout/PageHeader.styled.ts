import styled from "styled-components";

export const Root = styled.header`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PageNameBox = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
`;
