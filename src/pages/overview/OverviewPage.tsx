import { PageLayout } from "src/shared/layout/PageLayout";
import { AddTransactionButton } from "src/pages/transactions/AddTransactionButton";
import {
  AnalyticsPeriodSelection,
  type PeriodValue,
} from "src/pages/overview/AnalyticsPeriodSelection";
import { useState } from "react";
import { TransactionModal } from "src/shared/modals/TransactionModal";
import { OverviewTransactionsCards } from "src/pages/overview/OverviewTransactionsCards";
import { Flex } from "src/shared/ui/ui-kit/Flex";

const DEFAULT_PERIOD: PeriodValue = "7d";

export const OverviewPage = () => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<PeriodValue>(DEFAULT_PERIOD);

  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const handleToggleModal = (toggleState: boolean) => {
    setOpenTransactionModal(toggleState);
  };

  const selection = (
    <Flex gap="sm">
      <AnalyticsPeriodSelection
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <AddTransactionButton onModalToggle={handleToggleModal} />
    </Flex>
  );

  return (
    <PageLayout title="Overview" actions={selection}>
      <OverviewTransactionsCards />

      <TransactionModal
        open={openTransactionModal}
        onModalToggle={handleToggleModal}
      />
    </PageLayout>
  );
};
