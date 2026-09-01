import { PageLayout } from "src/shared/layout/PageLayout";
import { AddTransactionButton } from "src/pages/transactions/AddTransactionButton";
import { useState } from "react";
import { TransactionModal } from "src/shared/modals/TransactionModal";
import { TransactionFiltersBlock } from "src/pages/transactions/TransactionFiltersBlock";
import { TransactionsContent } from "src/pages/transactions/TransactionsContent";
import { ALL_FILTER_VALUE } from "src/pages/transactions/constants";
import type {
  TransactionFilterData,
  TransactionFilterUpdate,
} from "src/pages/transactions/types";
import { TRANSACTIONS_MOCK } from "src/pages/transactions/mock";

export const TransactionsPage = () => {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const [filterData, setFilterData] = useState<TransactionFilterData>({
    transactionType: ALL_FILTER_VALUE,
    category: ALL_FILTER_VALUE,
    date: "",
    sort: "newest",
    search: "",
  });

  const handleFilterChange = (data: TransactionFilterUpdate) => {
    setFilterData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleToggleModal = (toggleState: boolean) => {
    setOpenTransactionModal(toggleState);
  };

  return (
    <PageLayout
      title={"Transactions"}
      actions={<AddTransactionButton onModalToggle={handleToggleModal} />}
    >
      <TransactionFiltersBlock
        filterData={filterData}
        onFilterChange={handleFilterChange}
      />

      <TransactionsContent
        filters={filterData}
        transactions={TRANSACTIONS_MOCK}
      />

      <TransactionModal
        open={openTransactionModal}
        onModalToggle={handleToggleModal}
      />
    </PageLayout>
  );
};
