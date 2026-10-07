import styled from "styled-components";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { FlexStyled } from "src/shared/ui/ui-kit/Flex.styled";
import { InputStyled } from "src/shared/ui/ui-kit/Input.styled";

export const DateInputRoot = styled.div`
  min-width: 0;
`;

export const DateInputControl = styled(Flex)`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.white};

  &:focus-within {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryFocus};
  }
`;

export const DateTextInput = styled(InputStyled)`
  min-width: 0;
  flex: 1;
  border: none;
  background: transparent;

  &:focus-visible {
    box-shadow: none;
  }
`;

export const DatePickerButton = styled(FlexStyled).attrs({
  $direction: "row",
  $align: "center",
  $justify: "center",
})`
  flex: 0 0 44px;
  padding: 0;
  border: none;
  border-inline-start: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.secondary};
  }

  &:focus {
    outline: none;
  }
`;

export const NativeDateInput = styled.input`
  position: absolute;
  top: 50%;
  inset-inline-end: 22px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%);
`;
