import { PageLayout } from "src/shared/layout/PageLayout";
import { AddTransactionButton } from "src/pages/transactions/AddTransactionButton";

export const OverviewPage = () => {
  return (
    <PageLayout title={"Overview"} actions={<AddTransactionButton />}>
      Page content 1
    </PageLayout>
  );
};
