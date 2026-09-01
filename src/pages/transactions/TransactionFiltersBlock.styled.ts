import styled from "styled-components";

export const Root = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  padding: ${({ theme }) => `${theme.spacing.md} 10px`};
  gap: 5px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const SearchField = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.white};

  &:focus-within {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryFocus};
  }

  > svg {
    width: 20px;
    height: 20px;
    flex: 0 0 auto;
    pointer-events: none;
  }
`;

export const TransactionSearch = styled.input`
  min-width: 0;
  flex: 1;
  padding: 0;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: transparent;
  font-size: ${({ theme }) => theme.typography.bodyText.fontSize};
  line-height: ${({ theme }) => theme.typography.bodyText.lineHeight};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
