import { Root } from "src/pages/overview/OverviewTransactionsCards.styled";
import { OverviewCard } from "src/pages/overview/OverviewCard";
import { DollarCircleIcon } from "src/shared/ui/icons/DollarCircleIcon";
import { TrendingUpIcon } from "src/shared/ui/icons/TrendingUpIcon";
import { TrendingDownIcon } from "src/shared/ui/icons/TrendingDownIcon";
import { getCardData } from "src/pages/overview/getCardData";
import type { OverviewSummary } from "src/pages/overview/types";
import { OverviewCardsSkeleton } from "src/pages/overview/OverviewCardsSkeleton";
import { OverviewCardsError } from "src/pages/overview/OverviewCardsError";

type Props = {
  data?: OverviewSummary;
  dataLoading: boolean;
  dataFetching: boolean;
  hasDataError: boolean;
};

export const OverviewTransactionsCards = ({
  data,
  dataLoading,
  hasDataError,
  dataFetching,
}: Props) => {
  if (dataLoading) {
    return <OverviewCardsSkeleton />;
  }

  if (hasDataError || !data) {
    return <OverviewCardsError dataFetching={dataFetching} />;
  }

  const { currency, currentTotalBalance, income, expenses } = getCardData(data);

  return (
    <Root aria-busy={dataFetching}>
      <OverviewCard
        icon={<DollarCircleIcon />}
        title="Current balance"
        amount={currentTotalBalance}
        badgeText="All time"
        subtitle="Calculated from all transactions"
        currency={currency}
        dataFetching={dataFetching}
      />
      <OverviewCard
        icon={<TrendingUpIcon />}
        title="Income"
        amount={income}
        subtitle="Selected period"
        currency={currency}
        cardAccent="success"
        dataFetching={dataFetching}
      />
      <OverviewCard
        icon={<TrendingDownIcon />}
        title="Expenses"
        amount={expenses}
        subtitle="Selected period"
        currency={currency}
        cardAccent="danger"
        dataFetching={dataFetching}
      />
    </Root>
  );
};
