import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MEDIA } from "src/shared/styles/breakpoints";

export const Root = styled.div<{ $expanded: boolean }>`
  display: grid;
  grid-template-columns: ${({ $expanded }) =>
    $expanded ? "240px minmax(0, 1fr)" : "72px minmax(0, 1fr)"};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.background};
  transition: grid-template-columns ${({ theme }) => theme.transitions.normal};
  min-height: 100dvh;
  overflow-x: clip;
`;

export const BrandWrapper = styled.div<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $expanded }) =>
    $expanded ? "space-between" : "center"};
`;

export const Sidebar = styled.aside<{ $expanded: boolean }>`
  grid-column: 1;
  width: 100%;
  min-width: 0;
  align-self: stretch;
  padding: ${({ $expanded }) => ($expanded ? "32px 20px" : "32px 12px")};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition: padding ${({ theme }) => theme.transitions.normal};
  position: relative;
  z-index: 20;

  @media ${MEDIA.tablet} {
    padding: ${({ $expanded }) => ($expanded ? "20px" : "20px 12px")};
    border-right: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const Brand = styled.div<{ $expanded: boolean }>`
  display: ${({ $expanded }) => ($expanded ? "block" : "none")};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  font-weight: 700;
`;

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: 32px;
  overflow: hidden;

  @media ${MEDIA.tablet} {
    margin-top: 20px;
  }
`;

export const NavigationLink = styled(NavLink)`
  padding: 10px 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radii.sm};

  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
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

  @media ${MEDIA.tablet} {
    gap: 0;
  }
`;

export const MainContent = styled.main`
  padding: 32px;
  grid-column: 2;
  min-width: 0;

  @media ${MEDIA.tablet} {
    padding: 20px 16px;
  }
`;

export const CloseButton = styled.button`
  padding: 5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
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

  > svg {
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
  }

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
`;

// export const NavigationLabel = styled.span<{ $expanded: boolean }>`
//   opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
//   overflow: hidden;
//   white-space: nowrap;
//
//   transition:
//     opacity ${({ theme }) => theme.transitions.fast},
//     max-width ${({ theme }) => theme.transitions.normal};
// `;
export const NavigationLabel = styled.span<{ $expanded: boolean }>`
  min-width: 0;
  max-width: ${({ $expanded }) => ($expanded ? "160px" : "0")};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  overflow: hidden;
  white-space: nowrap;

  transition:
    opacity ${({ theme }) => theme.transitions.fast},
    max-width ${({ theme }) => theme.transitions.normal};
`;

export const Backdrop = styled.button<{ $visible: boolean }>`
  display: none;

  @media ${MEDIA.tablet} {
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
      opacity ${({ theme }) => theme.transitions.normal},
      visibility ${({ theme }) => theme.transitions.normal};
  }
`;
