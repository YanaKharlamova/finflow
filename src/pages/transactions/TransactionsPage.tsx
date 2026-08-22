import { PageLayout } from "src/shared/layout/PageLayout";
import { AddTransactionButton } from "src/pages/transactions/AddTransactionButton";

export const TransactionsPage = () => {
  return (
    <PageLayout title={"Transaction"} actions={<AddTransactionButton />}>
      Page content 2
    </PageLayout>
  );
};
