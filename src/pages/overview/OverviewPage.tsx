import { PageLayout } from "src/shared/layout/PageLayout";
import { AddTransactionButton } from "src/pages/transactions/AddTransactionButton";
import { AnalyticsPeriodSelection } from "src/pages/overview/AnalyticsPeriodSelection";
import { useEffect, useState } from "react";
import { TransactionModal } from "src/shared/modals/TransactionModal";
import { OverviewTransactionsCards } from "src/pages/overview/OverviewTransactionsCards";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { OverviewCashFlow } from "src/pages/overview/OverviewCashFlow";
import { OverviewExpensesByCategory } from "src/pages/overview/OverviewExpensesByCategory";
import type { PeriodValue } from "src/pages/overview/types";
import { DEFAULT_PERIOD, PERIOD_OPTIONS } from "src/pages/overview/constants";
import { useSearchParams } from "react-router";
import { useGetOverviewQuery } from "src/api/overviewApi";

export const OverviewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const periodParam = searchParams.get("period");
  const periodFromUrl = PERIOD_OPTIONS.find(
    ({ value }) => value === periodParam,
  )?.value;
  const selectedPeriod = periodFromUrl ?? DEFAULT_PERIOD;

  const { data, isLoading, isFetching, isError, refetch } =
    useGetOverviewQuery(selectedPeriod);
  const showSkeleton = isLoading || (isFetching && !data);

  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const handleToggleModal = (toggleState: boolean) => {
    setOpenTransactionModal(toggleState);
  };

  useEffect(() => {
    const canonicalPeriodInUrl =
      periodFromUrl !== undefined && periodFromUrl !== DEFAULT_PERIOD;

    if (periodParam === null || canonicalPeriodInUrl) {
      return;
    }

    setSearchParams(
      (previousParams) => {
        const nextParams = new URLSearchParams(previousParams);
        nextParams.delete("period");

        return nextParams;
      },
      { replace: true },
    );
  }, [periodFromUrl, periodParam, setSearchParams]);

  const handlePeriodChange = (period: PeriodValue) => {
    setSearchParams(
      (previousParams) => {
        const nextParams = new URLSearchParams(previousParams);

        if (period === DEFAULT_PERIOD) {
          nextParams.delete("period");
        } else {
          nextParams.set("period", period);
        }

        return nextParams;
      },
      { replace: true },
    );
  };

  const selection = (
    <Flex gap="sm">
      <AnalyticsPeriodSelection
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
      />
      <AddTransactionButton onModalToggle={handleToggleModal} />
    </Flex>
  );

  return (
    <PageLayout title="Overview" actions={selection}>
      <OverviewTransactionsCards
        data={data?.summary}
        dataLoading={isLoading}
        dataFetching={isFetching}
        hasDataError={isError}
      />

      <OverviewCashFlow
        data={data?.cashFlow}
        dataLoading={showSkeleton}
        dataFetching={isFetching}
        hasDataError={isError}
        currency={data?.summary?.currency}
        onModalToggle={handleToggleModal}
        onRetry={refetch}
      />

      <OverviewExpensesByCategory
        data={data?.expensesByCategory}
        dataLoading={showSkeleton}
        dataFetching={isFetching}
        hasDataError={isError}
        currency={data?.summary?.currency}
        totalExpensesMinor={data?.summary?.expensesMinor}
        onRetry={refetch}
      />

      <TransactionModal
        open={openTransactionModal}
        onModalToggle={handleToggleModal}
      />
    </PageLayout>
  );
};
