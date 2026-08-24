import { PageLayout } from "src/shared/layout/PageLayout";
import { AddTransactionButton } from "src/pages/transactions/AddTransactionButton";
import {
  AnalyticsPeriodSelection,
  type PeriodValue,
} from "src/pages/overview/AnalyticsPeriodSelection";
import { useState } from "react";
import { Root } from "src/pages/overview/OverviewPage.styled";

const DEFAULT_PERIOD: PeriodValue = "7d";

export const OverviewPage = () => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<PeriodValue>(DEFAULT_PERIOD);

  const selection = (
    <Root>
      <AnalyticsPeriodSelection
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <AddTransactionButton />
    </Root>
  );

  return (
    <PageLayout title={"Overview"} actions={selection}>
      Page content 1
    </PageLayout>
  );
};
