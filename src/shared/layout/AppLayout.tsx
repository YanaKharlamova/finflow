import { Outlet } from "react-router-dom";
import { useState } from "react";

import {
  Backdrop,
  Brand,
  BrandWrapper,
  CloseButton,
  MainContent,
  Navigation,
  NavigationLabel,
  NavigationLink,
  Root,
  Sidebar,
} from "src/shared/layout/AppLayout.styled";
import { SidebarIcon } from "src/shared/ui/icons/CloseIcon";

import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { MEDIA } from "src/shared/styles/breakpoints";
import { BarChartIcon } from "src/shared/ui/icons/BarChartIcon";
import { CardSettingsIcon } from "src/shared/ui/icons/CardSettingsIcon";

export const AppLayout = () => {
  const compact = useMediaQuery(MEDIA.tablet);

  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [desktopExpanded, setDesktopExpanded] = useState(true);

  const sidebarExpanded = compact ? mobileExpanded : desktopExpanded;

  const backdropVisible = compact && sidebarExpanded;

  const handleToggleSidebar = () => {
    if (compact) {
      setMobileExpanded((current) => !current);
    } else {
      setDesktopExpanded((current) => !current);
    }
  };

  const handleCloseSidebar = () => {
    setMobileExpanded(false);
  };

  return (
    <Root $expanded={sidebarExpanded}>
      <Sidebar $expanded={sidebarExpanded}>
        <BrandWrapper $expanded={sidebarExpanded}>
          <Brand $expanded={sidebarExpanded}>Finflow</Brand>

          <CloseButton
            type="button"
            aria-label={sidebarExpanded ? "Collapse menu" : "Expand menu"}
            aria-expanded={sidebarExpanded}
            onClick={handleToggleSidebar}
          >
            <SidebarIcon />
          </CloseButton>
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
        <Outlet />
      </MainContent>
    </Root>
  );
};
