import { PageLayout } from "src/shared/layout/PageLayout";
import { AddTransactionButton } from "src/pages/transactions/AddTransactionButton";
import { useEffect, useState } from "react";
import { TransactionModal } from "src/shared/modals/TransactionModal";
import { TransactionFiltersBlock } from "src/pages/transactions/TransactionFiltersBlock";
import { TransactionsContent } from "src/pages/transactions/TransactionsContent";
import {
  ALL_FILTER_VALUE,
  DEFAULT_PAGE_SIZE,
} from "src/pages/transactions/constants";
import type {
  TransactionFilterData,
  TransactionFilterUpdate,
} from "src/shared/types/transaction";
import { useGetTransactionsQuery } from "src/api/transactionsApi";
import { useOutletContext, useSearchParams } from "react-router-dom";
import type { AppLayoutContext } from "src/shared/layout/AppLayout";

export const TransactionsPage = () => {
  const { backdropVisible, handleCloseSidebar } =
    useOutletContext<AppLayoutContext>();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const pageFromUrl = Number(pageParam);

  const currentPage =
    Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const [filterData, setFilterData] = useState<TransactionFilterData>({
    transactionType: ALL_FILTER_VALUE,
    category: ALL_FILTER_VALUE,
    date: "",
    sort: "newest",
    search: "",
  });

  const { transactionType, category, date, sort, search } = filterData;

  const { data, isLoading, isFetching, isError, refetch } =
    useGetTransactionsQuery({
      page: currentPage,
      limit: DEFAULT_PAGE_SIZE,
      search,
      type: transactionType,
      category,
      date,
      sort,
    });

  const showSkeleton = isLoading || (isFetching && !data);

  const dataReady = data && !isFetching && !isError;

  const transactions = data?.items ?? [];

  const totalAmountTransactions = data?.total ?? 0;

  const pagesAmount = Math.ceil(totalAmountTransactions / DEFAULT_PAGE_SIZE);

  const hasActiveFilters =
    transactionType !== ALL_FILTER_VALUE ||
    category !== ALL_FILTER_VALUE ||
    Boolean(date) ||
    Boolean(search.trim());

  const handleFilterChange = (data: TransactionFilterUpdate) => {
    setFilterData((prev) => ({
      ...prev,
      ...data,
    }));

    handleSetPageParam(1);
  };

  const handleToggleModal = (toggleState: boolean) => {
    if (toggleState && backdropVisible) {
      handleCloseSidebar();
    }

    setOpenTransactionModal(toggleState);
  };

  const handleSetPageParam = (page: number) => {
    setSearchParams((previousParams) => {
      const nextParams = new URLSearchParams(previousParams);

      if (page <= 1) {
        nextParams.delete("page");
      } else {
        nextParams.set("page", String(page));
      }

      return nextParams;
    });
  };

  useEffect(() => {
    if (pageParam === null || !dataReady) {
      return;
    }

    const invalidPage =
      !Number.isInteger(pageFromUrl) ||
      pageFromUrl <= 1 ||
      pageFromUrl > pagesAmount;

    if (!invalidPage) {
      return;
    }

    setSearchParams(
      (previousParams) => {
        const nextParams = new URLSearchParams(previousParams);
        nextParams.delete("page");

        return nextParams;
      },
      { replace: true },
    );
  }, [setSearchParams, pageFromUrl, pagesAmount, pageParam, dataReady]);

  return (
    <PageLayout
      title="Transactions"
      actions={<AddTransactionButton onModalToggle={handleToggleModal} />}
    >
      <TransactionFiltersBlock
        filterData={filterData}
        onFilterChange={handleFilterChange}
      />

      <TransactionsContent
        transactions={transactions}
        pagesAmount={pagesAmount}
        currentPage={currentPage}
        dataInitialLoading={showSkeleton}
        dataError={isError}
        hasActiveFilters={hasActiveFilters}
        onPageChange={handleSetPageParam}
        handleReloadData={refetch}
      />

      <TransactionModal
        open={openTransactionModal}
        onModalToggle={handleToggleModal}
      />
    </PageLayout>
  );
};
