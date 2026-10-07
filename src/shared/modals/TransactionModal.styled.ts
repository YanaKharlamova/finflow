import styled from "styled-components";
import { Dialog, RadioGroup } from "radix-ui";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { Flex } from "src/shared/ui/ui-kit/Flex";

export const ModalOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow-y: auto;
  background: rgb(15 23 42 / 45%);

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    padding: ${({ theme }) => theme.spacing.md};
    align-items: center;
  }
`;

export const ModalContent = styled(Dialog.Content)`
  width: 100%;
  max-height: calc(100dvh - 32px);
  padding: ${({ theme }) =>
    `${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md}`};
  overflow-y: auto;
  border-radius: ${({ theme }) => `${theme.radii.md} ${theme.radii.md} 0 0`};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 10px 30px rgb(15 23 42 / 15%);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  &:focus {
    outline: none;
  }

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    width: min(420px, 100%);
    border-radius: ${({ theme }) => `${theme.radii.md} ${theme.radii.md}`};
  }
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  width: 100%;
  gap: ${({ theme }) => theme.spacing.sm};
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
  background: ${({ theme }) => theme.colors.white};
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

export const ButtonGroup = styled(Flex)`
  > button {
    flex: 1;
  }
`;

export const FieldsRow = styled(Flex)`
  width: 100%;

  > div {
    flex: 1;
    position: relative;

    &:focus-within {
      z-index: 1;
    }
  }

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;
