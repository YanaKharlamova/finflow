import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { useState } from "react";

export const useResponsiveSidebar = () => {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [tabletExpanded, setTabletExpanded] = useState(false);
  const [desktopExpanded, setDesktopExpanded] = useState(true);

  const mobile = useMediaQuery(`(width < ${BREAKPOINTS.mobileLg}px)`);
  const tablet = useMediaQuery(
    `(${BREAKPOINTS.mobileLg}px <= width < ${BREAKPOINTS.tablet}px)`,
  );

  const handleToggleSidebar = () => {
    if (mobile) {
      const nextExpanded = !mobileExpanded;

      setMobileExpanded(nextExpanded);
      setDesktopExpanded(nextExpanded);
      setTabletExpanded(nextExpanded);
      return;
    }

    if (tablet) {
      setTabletExpanded((current) => !current);
      return;
    }

    const nextExpanded = !desktopExpanded;

    setDesktopExpanded(nextExpanded);

    if (!nextExpanded) {
      setMobileExpanded(false);
      setTabletExpanded(false);
    }
  };

  const handleCloseSidebar = () => {
    setMobileExpanded(false);
    setTabletExpanded(false);
    setDesktopExpanded(false);
  };

  const getSidebarExpanded = () => {
    if (mobile) {
      return mobileExpanded;
    }

    if (tablet) {
      return tabletExpanded;
    }

    return desktopExpanded;
  };

  const sidebarExpanded = getSidebarExpanded();

  const backdropVisible = mobile && sidebarExpanded;

  return {
    sidebarExpanded,
    tabletExpanded,
    backdropVisible,
    handleToggleSidebar,
    handleCloseSidebar,
  };
};
