import styled, { css } from "styled-components";
import { Select as RadixSelect } from "radix-ui";
import { ArrowDownIcon } from "src/shared/ui/icons/ArrowDownIcon";

export const SELECT_VARIANTS = { compact: "compact", field: "field" } as const;

export type SelectVariant =
  (typeof SELECT_VARIANTS)[keyof typeof SELECT_VARIANTS];

const triggerVariants = {
  compact: css`
    min-width: 100px;
    padding: 5px 5px 3px 10px;
    font: inherit;
  `,
  field: css`
    width: 100%;
    padding: 10px 12px;
    font-size: ${({ theme }) => theme.typography.bodyText.fontSize};
    line-height: ${({ theme }) => theme.typography.bodyText.lineHeight};
  `,
};

export const Trigger = styled(RadixSelect.Trigger)<{
  $variant: SelectVariant;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  ${({ $variant }) => triggerVariants[$variant]}

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryFocus};
  }
`;

export const ArrowIcon = styled(ArrowDownIcon)`
  display: block;
  width: 24px;
  height: 24px;
`;

export const Content = styled(RadixSelect.Content)`
  z-index: 1001;
  width: var(--radix-select-trigger-width);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 8px 24px rgb(23 34 59 / 12%);

  &[data-state="open"] {
    animation: fade-in ${({ theme }) => theme.transitions.normal};
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }
`;

export const Viewport = styled(RadixSelect.Viewport)`
  padding: ${({ theme }) => theme.spacing.xs};
`;

export const Item = styled(RadixSelect.Item)`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.bodyText.fontSize};
  line-height: ${({ theme }) => theme.typography.bodyText.lineHeight};
  cursor: pointer;
  user-select: none;

  &[data-highlighted] {
    outline: none;
    background: ${({ theme }) => theme.colors.secondaryHover};
  }

  &[data-state="checked"] {
    background: ${({ theme }) => theme.colors.secondaryFocus};
  }
`;
