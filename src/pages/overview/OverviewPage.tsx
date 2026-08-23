import { PageLayout } from "src/shared/layout/PageLayout";
import { AddTransactionButton } from "src/pages/transactions/AddTransactionButton";
import { AnalyticsPeriodSelection } from "src/pages/overview/AnalyticsPeriodSelection";
import { Root } from "src/pages/overview/SelectionStyled.styled";

export const OverviewPage = () => {
  const selection = (
    <Root>
      <AnalyticsPeriodSelection />
      <AddTransactionButton />
    </Root>
  );
  return (
    <PageLayout title={"Overview"} actions={selection}>
      Page content 1
    </PageLayout>
  );
};
