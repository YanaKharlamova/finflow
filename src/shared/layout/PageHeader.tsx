import type { ReactNode } from "react";
import {
  Brand,
  PageTitle,
  Root,
} from "src/shared/layout/PageHeader.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { ToggleButton } from "src/shared/layout/AppLayout.styled";
import { ToggleIcon } from "src/shared/ui/icons/ToggleIcon";
import { CloseIcon } from "src/shared/ui/icons/CloseIcon";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

type Props = {
  title: string;
  actions: ReactNode;
  sidebarExpanded: boolean;
  onToggleSidebar: () => void;
};

export const PageHeader = ({
  title,
  actions,
  sidebarExpanded,
  onToggleSidebar,
}: Props) => {
  const mobile = useMediaQuery(`(width < ${BREAKPOINTS.mobileLg}px)`);

  return (
    <Root>
      <Flex align="center">
        <Brand />

        <ToggleButton
          type="button"
          aria-label={sidebarExpanded ? "Collapse menu" : "Expand menu"}
          aria-expanded={sidebarExpanded}
          onClick={onToggleSidebar}
        >
          {mobile && sidebarExpanded ? <CloseIcon /> : <ToggleIcon />}
        </ToggleButton>

        <PageTitle>
          <Typography variant="pageTitle">{title}</Typography>
        </PageTitle>
      </Flex>
      {actions}
    </Root>
  );
};
