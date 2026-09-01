import { Root } from "src/shared/layout/PageLayout.styled.ts";
import type { ReactNode } from "react";
import { PageHeader } from "src/shared/layout/PageHeader";

type Props = {
  title: string;
  actions: ReactNode;
  children: ReactNode;
};

export const PageLayout = ({ title, actions, children }: Props) => {
  return (
    <Root>
      <PageHeader title={title} actions={actions} />
      {children}
    </Root>
  );
};
