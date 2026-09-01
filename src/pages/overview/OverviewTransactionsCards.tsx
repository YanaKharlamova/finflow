import { Root } from "src/pages/overview/OverviewTransactionsCards.styled";
import { OverviewCard } from "src/pages/overview/OverviewCard";
import { DollarCircleIcon } from "src/shared/ui/icons/DollarCircleIcon";
import { TrendingUpIcon } from "src/shared/ui/icons/TrendingUpIcon";
import { TrendingDownIcon } from "src/shared/ui/icons/TrendingDownIcon";
import { getCardData } from "src/pages/overview/getCardData";

export const OverviewTransactionsCards = () => {
  const { currency, currentTotalBalance, income, expenses } = getCardData();

  return (
    <Root direction="column" gap="sm">
      <OverviewCard
        icon={<DollarCircleIcon />}
        title="Current balance"
        amount={currentTotalBalance}
        badgeText="All time"
        subtitle="Calculated from all transactions"
        currency={currency}
      />
      <OverviewCard
        icon={<TrendingUpIcon />}
        title="Income"
        amount={income}
        subtitle="Selected period"
        currency={currency}
        cardAccent="success"
      />
      <OverviewCard
        icon={<TrendingDownIcon />}
        title="Expenses"
        amount={expenses}
        subtitle="Selected period"
        currency={currency}
        cardAccent="danger"
      />
    </Root>
  );
};
