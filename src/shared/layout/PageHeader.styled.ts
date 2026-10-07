import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { FinflowLogo } from "src/shared/ui/icons/FinflowLogo";
import { FinflowLogoSmall } from "src/shared/ui/icons/FinflowLogoSmall";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { Popover } from "radix-ui";

export const Root = styled.header`
  position: sticky;
  top: 0;
  grid-row: 1;
  grid-column: 1 / -1;
  z-index: 30;
  box-sizing: border-box;
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 10px ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 6px rgb(23 34 59 / 8%);

  @media (min-width: ${BREAKPOINTS.mobileMd}px) {
    padding-inline: ${({ theme }) => theme.spacing.sm};
  }
`;

export const HeaderDivider = styled.span`
  width: 1px;
  height: 24px;
  flex: 0 0 1px;
  background: ${({ theme }) => theme.colors.border};
`;

export const Brand = styled(FinflowLogo)`
  width: 108px;
  height: 32px;
  flex: 0 0 108px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const BrandSmall = styled(FinflowLogoSmall)`
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const DemoDataButtonGroup = styled(Flex)`
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  overflow: hidden;

  > button {
    border: 0;
    border-radius: 0;
  }

  > button + button {
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }

  > button:focus-visible {
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primaryFocus};
  }
`;

export const DemoDataPopoverContent = styled(Popover.Content)`
  z-index: 1001;
  width: max-content;
  max-width: min(280px, calc(100vw - 16px));
  padding: ${({ theme }) => `${theme.spacing.sm} 12px`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 8px 24px rgb(23 34 59 / 12%);
`;
