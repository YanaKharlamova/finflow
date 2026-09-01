import {
  PageContentContainer,
  Root,
} from "src/shared/layout/PageLayout.styled";
import type { ReactNode } from "react";
import { PageHeader } from "src/shared/layout/PageHeader";

type Props = {
  title: string;
  actions: ReactNode;
  children: ReactNode;
};

export const PageLayout = ({ title, actions, children }: Props) => {
  return (
    <Root direction="column" gap="xs">
      <PageContentContainer>
        <PageHeader title={title} actions={actions} />
        {children}
      </PageContentContainer>
    </Root>
  );
};
