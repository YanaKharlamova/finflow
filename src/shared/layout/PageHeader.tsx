import type { ReactNode } from "react";
import { PageNameBox, Root } from "src/shared/layout/PageHeader.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { useOutletContext } from "react-router-dom";
import { ToggleButton } from "src/shared/layout/AppLayout.styled";
import { ToggleIcon } from "src/shared/ui/icons/ToggleIcon";

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

  return (
    <Root>
      <ToggleButton
        type="button"
        aria-label={sidebarExpanded ? "Collapse menu" : "Expand menu"}
        aria-expanded={sidebarExpanded}
        onClick={handleToggleSidebar}
        $headerButton
      >
        <ToggleIcon />
      </ToggleButton>

      <PageNameBox>
        <Typography>{title}</Typography>
      </PageNameBox>
      {actions}
    </Root>
  );
};
