import styled from "styled-components";
import { Popover } from "radix-ui";
import { Button } from "src/shared/ui/ui-kit/Button";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { FlexStyled } from "src/shared/ui/ui-kit/Flex.styled";
import { ErrorMessage } from "src/shared/ui/ui-kit/FormControl.styled";
import { InputStyled } from "src/shared/ui/ui-kit/Input.styled";

export const DateInputRoot = styled.div`
  min-width: 0;

  ${ErrorMessage} {
    margin-block-start: ${({ theme }) => theme.spacing.xs};
  }
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

  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.secondary};
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primaryFocus};
  }
`;

export const CalendarContent = styled(Popover.Content)`
  z-index: 1001;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 8px 24px rgb(23 34 59 / 12%);

  .rdp-root {
    --rdp-accent-color: ${({ theme }) => theme.colors.primary};
    --rdp-accent-background-color: ${({ theme }) => theme.colors.secondary};
    --rdp-day-width: 36px;
    --rdp-day-height: 36px;
    --rdp-day_button-width: 34px;
    --rdp-day_button-height: 34px;
  }
`;

export const CalendarClearButton = styled(Button)`
  display: block;
  margin-inline-start: auto;
  padding: 3px 8px;
  border-width: 1px;
  font-size: 12px;
  line-height: 18px;
`;
