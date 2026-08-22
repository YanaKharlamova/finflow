import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { FinflowLogo } from "src/shared/ui/icons/FinflowLogo";
import { CloseIcon } from "src/shared/ui/icons/CloseIcon";
import { ToggleIcon } from "src/shared/ui/icons/ToggleIcon";

export const Root = styled.div<{ $expanded: boolean }>`
  display: grid;
  grid-template-columns: 0 minmax(0, 1fr);
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.background};
  transition: grid-template-columns ${({ theme }) => theme.transitions.slow};
  min-height: 100dvh;
  overflow-x: clip;

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    grid-template-columns: ${({ $expanded }) =>
      $expanded ? "240px minmax(0, 1fr)" : "72px minmax(0, 1fr)"};
  }
`;

export const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 32px;
`;

export const Sidebar = styled.aside<{
  $expanded: boolean;
  $collapseBeforeHide: boolean;
}>`
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 20;
  width: ${({ $expanded }) => ($expanded ? "min(240px, 100vw)" : "72px")};
  min-width: 0;
  padding: ${({ $expanded }) => ($expanded ? "20px" : "20px 12px")};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transform: translateX(${({ $expanded }) => ($expanded ? "0" : "-100%")});
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  visibility: ${({ $expanded }) => ($expanded ? "visible" : "hidden")};

  transition: ${({ theme, $expanded, $collapseBeforeHide }) => {
    const slow = theme.transitions.slow;
    const normal = theme.transitions.normal;
    const delay = $expanded || !$collapseBeforeHide ? "0ms" : "300ms";

    return `
    width ${slow},
    padding ${slow},
    transform ${slow} ${delay},
    opacity ${normal} ${delay},
    visibility ${normal} ${delay}
  `;
  }};

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    position: relative;
    inset: auto;
    grid-column: 1;
    width: ${({ $expanded }) => ($expanded ? "240px" : "72px")};
    align-self: stretch;
    transform: none;
    opacity: 1;
    visibility: visible;
    border-right: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    transition:
      width ${({ theme }) => theme.transitions.slow}
        ${({ $expanded }) => ($expanded ? "0ms" : "180ms")},
      padding ${({ theme }) => theme.transitions.slow}
        ${({ $expanded }) => ($expanded ? "0ms" : "180ms")},
      transform ${({ theme }) => theme.transitions.slow},
      opacity ${({ theme }) => theme.transitions.normal},
      visibility ${({ theme }) => theme.transitions.normal};
  }

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom: 0;
  }
`;

export const Brand = styled(FinflowLogo)<{ $expanded: boolean }>`
  width: auto;
  max-width: ${({ $expanded }) => ($expanded ? "108px" : "0")};
  flex: 0 1 auto;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.primary};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  visibility: ${({ $expanded }) => ($expanded ? "visible" : "hidden")};

  transition:
    opacity ${({ theme }) => theme.transitions.normal}
      ${({ $expanded }) => ($expanded ? "180ms" : "0ms")},
    visibility ${({ theme }) => theme.transitions.normal}
      ${({ $expanded }) => ($expanded ? "180ms" : "0ms")},
    max-width ${({ theme }) => theme.transitions.slow}
      ${({ $expanded }) => ($expanded ? "0ms" : "180ms")};
`;

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
  margin-top: 25px;
`;

export const NavigationLink = styled(NavLink)`
  padding: 10px 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radii.sm};

  display: flex;
  align-items: center;
  gap: 0;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  min-width: 0;
  overflow: hidden;

  > svg {
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    background: ${({ theme }) => theme.colors.background};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.interactiveHover};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.interactiveFocus};
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.focusRing};
  }

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const MainContent = styled.main`
  grid-column: 2;
  min-width: 0;
`;

export const ToggleButton = styled.button<{ $headerButton?: boolean }>`
  width: 48px;
  margin-left: ${($headerButton) => ($headerButton ? 0 : "auto")};
  padding: 10px 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  border: none;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.interactiveHover};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.interactiveFocus};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focusRing};
  }

  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    display: ${({ $headerButton }) => ($headerButton ? "none" : "inline-flex")};
  }
`;

export const CloseIconStyled = styled(CloseIcon)`
  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    display: none;
  }
`;

export const ToggleIconStyled = styled(ToggleIcon)`
  @media (min-width: ${BREAKPOINTS.mobileLg}px) {
    display: block;
  }
  display: none;
`;

export const NavigationLabel = styled.span<{ $expanded: boolean }>`
  min-width: 0;
  max-width: ${({ $expanded }) => ($expanded ? "160px" : "0")};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  overflow: hidden;
  white-space: nowrap;

  transition:
    opacity ${({ theme }) => theme.transitions.normal},
    max-width ${({ theme }) => theme.transitions.normal};
  transition-delay: ${({ $expanded }) => ($expanded ? "180ms" : "0ms")};
`;

export const Backdrop = styled.button<{ $visible: boolean }>`
  display: block;
  position: fixed;
  inset: 0;
  z-index: 10;
  padding: 0;
  border: 0;
  background: rgb(15 23 42 / 45%);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};

  transition:
    opacity ${({ theme }) => theme.transitions.slow},
    visibility ${({ theme }) => theme.transitions.slow};

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    display: none;
  }
`;
