import styled from "styled-components";

export const NoTransactionsWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    width: 50px;
    height: 50px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  margin: 0 20px;
  text-align: center;
`;
