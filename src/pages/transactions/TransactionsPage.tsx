import { PageLayout } from "src/shared/layout/PageLayout";
import { AddTransactionButton } from "src/pages/transactions/AddTransactionButton";
import { useState } from "react";
import { TransactionModal } from "src/shared/modals/TransactionModal";
import { TransactionFiltersBlock } from "src/pages/transactions/TransactionFiltersBlock";
import { TransactionsContent } from "src/pages/transactions/TransactionsContent";

export const TransactionsPage = () => {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const handleToggleModal = (toggleState: boolean) => {
    setOpenTransactionModal(toggleState);
  };

  return (
    <PageLayout
      title={"Transactions"}
      actions={<AddTransactionButton onModalToggle={handleToggleModal} />}
    >
      <TransactionFiltersBlock />

      <TransactionsContent />

      <TransactionModal
        open={openTransactionModal}
        onModalToggle={handleToggleModal}
      />
    </PageLayout>
  );
};
