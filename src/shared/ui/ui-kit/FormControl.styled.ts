import styled from "styled-components";

export const ErrorMessage = styled.span`
  display: block;
  min-height: 14px;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
`;
