import type { ReactNode } from "react";
import { Root } from "src/shared/layout/PageHeader.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { useOutletContext } from "react-router-dom";
import { ToggleButton } from "src/shared/layout/AppLayout.styled";
import { ToggleIcon } from "src/shared/ui/icons/ToggleIcon";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

type OutletContext = {
  sidebarExpanded: boolean;
  handleToggleSidebar: () => void;
};

type Props = {
  title: string;
  actions: ReactNode;
};

export const PageHeader = ({ title, actions }: Props) => {
  const { sidebarExpanded, handleToggleSidebar } =
    useOutletContext<OutletContext>();

  const mobile = useMediaQuery(`(width < ${BREAKPOINTS.mobileLg}px)`);

  return (
    <Root>
      <Flex align="center">
        <ToggleButton
          type="button"
          aria-label={sidebarExpanded ? "Collapse menu" : "Expand menu"}
          aria-expanded={sidebarExpanded}
          onClick={handleToggleSidebar}
          $headerButton
        >
          <ToggleIcon />
        </ToggleButton>

        <Typography variant={mobile ? "pageTitleSm" : "pageTitle"}>
          {title}
        </Typography>
      </Flex>
      {actions}
    </Root>
  );
};
