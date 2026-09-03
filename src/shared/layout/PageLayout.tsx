import {
  PageContentContainer,
  Root,
} from "src/shared/layout/PageLayout.styled";
import type { ReactNode } from "react";
import { PageHeader } from "src/shared/layout/PageHeader";
import { useOutletContext } from "react-router-dom";
import type { AppLayoutContext } from "src/shared/layout/AppLayout";
import {
  Backdrop,
  MainContent,
  Navigation,
  NavigationLabel,
  NavigationLink,
  Root as AppRoot,
  Sidebar,
} from "src/shared/layout/AppLayout.styled";
import { BarChartIcon } from "src/shared/ui/icons/BarChartIcon";
import { CardSettingsIcon } from "src/shared/ui/icons/CardSettingsIcon";

type Props = {
  title: string;
  actions: ReactNode;
  children: ReactNode;
};

export const PageLayout = ({ title, actions, children }: Props) => {
  const {
    sidebarExpanded,
    tabletExpanded,
    handleToggleSidebar,
    handleCloseSidebar,
    backdropVisible,
  } = useOutletContext<AppLayoutContext>();

  return (
    <AppRoot $expanded={sidebarExpanded}>
      <PageHeader
        title={title}
        actions={actions}
        sidebarExpanded={sidebarExpanded}
        onToggleSidebar={handleToggleSidebar}
      />

      <Sidebar $expanded={sidebarExpanded} $collapseBeforeHide={tabletExpanded}>
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
        <Root direction="column" gap="xs">
          <PageContentContainer>{children}</PageContentContainer>
        </Root>
      </MainContent>
    </AppRoot>
  );
};
