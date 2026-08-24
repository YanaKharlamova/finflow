import styled from "styled-components";
import { Select } from "radix-ui";
import { ArrowDownIcon } from "src/shared/ui/icons/ArrowDownIcon";

export const ContentStyled = styled(Select.Content)`
  z-index: 30;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 8px 24px rgb(23 34 59 / 12%);
`;

export const SelectionStyled = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 100px;
  padding: 5px 5px 3px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.surface};
  font: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.buttonFocus};
    outline-offset: 2px;
  }
`;

export const ArrowIconStyled = styled(ArrowDownIcon)`
  display: block;
  width: 24px;
  height: 24px;
`;

export const ViewportStyled = styled(Select.Viewport)`
  padding: ${({ theme }) => theme.spacing.xs};
`;

export const ItemStyled = styled(Select.Item)`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 32px 8px 10px;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  user-select: none;

  &[data-highlighted] {
    outline: none;
    background: ${({ theme }) => theme.colors.interactiveHover};
  }
`;
