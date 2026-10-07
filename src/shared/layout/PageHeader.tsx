import type { ReactNode } from "react";
import {
  Brand,
  BrandSmall,
  HeaderDivider,
  Root,
} from "src/shared/layout/PageHeader.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { ToggleButton } from "src/shared/layout/AppLayout.styled";
import { ToggleIcon } from "src/shared/ui/icons/ToggleIcon";
import { CloseIcon } from "src/shared/ui/icons/CloseIcon";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { DemoDataAction } from "src/shared/layout/DemoDataAction";

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
  const compact = useMediaQuery(`(width < ${BREAKPOINTS.tabletLg}px)`);

  return (
    <Root>
      <Flex align="center">
        <Flex align="center" gap="sm">
          {compact ? <BrandSmall /> : <Brand />}
          <HeaderDivider aria-hidden="true" />
        </Flex>

        <Flex align="center" gap="sm">
          <ToggleButton
            type="button"
            aria-label={sidebarExpanded ? "Collapse menu" : "Expand menu"}
            aria-expanded={sidebarExpanded}
            onClick={onToggleSidebar}
          >
            {mobile && sidebarExpanded ? <CloseIcon /> : <ToggleIcon />}
          </ToggleButton>

          {compact ? null : <Typography variant="title">{title}</Typography>}
        </Flex>
      </Flex>

      <Flex align="center" justify="flex-end" gap="xs">
        <DemoDataAction compact={compact} />
        {actions}
      </Flex>
    </Root>
  );
};
