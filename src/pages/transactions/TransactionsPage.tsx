import { PageLayout } from "src/shared/layout/PageLayout";
import { AddTransactionButton } from "src/pages/transactions/AddTransactionButton";
import { useState } from "react";
import { TransactionModal } from "src/shared/modals/TransactionModal";

export const TransactionsPage = () => {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const handleToggleModal = (toggleState: boolean) => {
    setOpenTransactionModal(toggleState);
  };

  return (
    <PageLayout
      title={"Transaction"}
      actions={<AddTransactionButton onModalToggle={handleToggleModal} />}
    >
      <TransactionModal
        open={openTransactionModal}
        onModalToggle={handleToggleModal}
      />
    </PageLayout>
  );
};
