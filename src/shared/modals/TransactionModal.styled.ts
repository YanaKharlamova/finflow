import styled from "styled-components";
import { Dialog, RadioGroup } from "radix-ui";

export const ModalOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  overflow-y: auto;
  background: rgb(15 23 42 / 45%);
`;

export const ModalContent = styled(Dialog.Content)`
  width: min(420px, 100%);
  max-height: calc(100dvh - 32px);
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 10px 30px rgb(15 23 42 / 15%);
  display: flex;
  flex-direction: column;
  gap: 15px;

  &:focus {
    outline: none;
  }
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: green;
`;

export const ModalTitle = styled(Dialog.Title)`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 20px;
  font-weight: 600;
  display: block;
`;

export const IconButton = styled.button`
  border: none;
  background-color: transparent;
  &:focus {
    cursor: pointer;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: tan;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const InputStyled = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.bodyText.fontSize};
  line-height: ${({ theme }) => theme.typography.bodyText.lineHeight};

  &[type="number"] {
    appearance: textfield;
  }

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    margin: 0;
    appearance: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.buttonFocus};
  }
`;

export const ErrorMessage = styled.span`
  color: #9b4a45;
  font-size: 12px;
`;

export const SelectionContainer = styled(RadioGroup.Root)`
  width: 100%;
  display: flex;
`;

export const SelectionItem = styled(RadioGroup.Item)<{ $danger?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ $danger }) => ($danger ? "#e2c3c0" : "#b9d5c8")};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ $danger }) => ($danger ? "#9b4a45" : "#3f725f")};
  background: ${({ $danger, theme }) =>
    $danger ? "#fcf8f7" : theme.colors.surface};
  cursor: pointer;

  transition: all ${({ theme }) => theme.transitions.fast};

  > p {
    color: inherit;
  }

  &:hover {
    background: ${({ $danger }) => ($danger ? "#f8eeee" : "#edf5f1")};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ $danger }) => ($danger ? "#c9827c" : "#78a890")};
  }

  &[data-state="checked"] {
    color: ${({ $danger }) => ($danger ? "#843f3b" : "#315f4d")};
    border-color: ${({ $danger }) => ($danger ? "#bd7771" : "#6d9b84")};
    background: ${({ $danger }) => ($danger ? "#f3e2e0" : "#e2efe8")};
  }

  &:active {
    background: ${({ $danger }) => ($danger ? "#ecd4d1" : "#d7e8df")};
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  > button {
    flex: 1;
  }
`;

export const FieldsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

  > ${Field} {
    flex: 1;
  }
`;
