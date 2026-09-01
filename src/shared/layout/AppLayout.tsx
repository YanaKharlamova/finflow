import { Outlet } from "react-router-dom";

import {
  Backdrop,
  Brand,
  BrandWrapper,
  CloseIconStyled,
  MainContent,
  Navigation,
  NavigationLabel,
  NavigationLink,
  Root,
  Sidebar,
  ToggleButton,
  ToggleIconStyled,
} from "src/shared/layout/AppLayout.styled";

import { BarChartIcon } from "src/shared/ui/icons/BarChartIcon";
import { CardSettingsIcon } from "src/shared/ui/icons/CardSettingsIcon";
import { useResponsiveSidebar } from "src/shared/layout/hooks/useResponsiveSidebar";

export const AppLayout = () => {
  const {
    sidebarExpanded,
    tabletExpanded,
    handleToggleSidebar,
    handleCloseSidebar,
    backdropVisible,
  } = useResponsiveSidebar();

  return (
    <Root $expanded={sidebarExpanded}>
      <Sidebar $expanded={sidebarExpanded} $collapseBeforeHide={tabletExpanded}>
        <BrandWrapper>
          <Brand $expanded={sidebarExpanded} />

          <ToggleButton
            type="button"
            aria-label={sidebarExpanded ? "Collapse menu" : "Expand menu"}
            aria-expanded={sidebarExpanded}
            onClick={handleToggleSidebar}
          >
            <ToggleIconStyled />
            <CloseIconStyled />
          </ToggleButton>
        </BrandWrapper>

        <Navigation aria-label="Main navigation">
          <NavigationLink to="/" end>
            <BarChartIcon />

            <NavigationLabel $expanded={sidebarExpanded}>
              Overview
            </NavigationLabel>
          </NavigationLink>

          <NavigationLink to="/transactions">
            <CardSettingsIcon />

            <NavigationLabel $expanded={sidebarExpanded}>
              Transactions
            </NavigationLabel>
          </NavigationLink>
        </Navigation>
      </Sidebar>

      <Backdrop
        type="button"
        aria-label="Close sidebar"
        $visible={backdropVisible}
        onClick={handleCloseSidebar}
      />

      <MainContent>
        <Outlet context={{ sidebarExpanded, handleToggleSidebar }} />
      </MainContent>
    </Root>
  );
};
