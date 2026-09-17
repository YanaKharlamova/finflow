import { OverviewCard } from "src/pages/overview/OverviewCard";
import { Root } from "src/pages/overview/OverviewTransactionsCards.styled";
import { DollarCircleIcon } from "src/shared/ui/icons/DollarCircleIcon";
import { TrendingUpIcon } from "src/shared/ui/icons/TrendingUpIcon";
import { TrendingDownIcon } from "src/shared/ui/icons/TrendingDownIcon";

export const OverviewCardsError = () => (
  <Root role="alert">
    <OverviewCard
      icon={<DollarCircleIcon />}
      title="Current balance"
      amount="—"
      badgeText="All time"
      subtitle="Unable to load"
    />
    <OverviewCard
      icon={<TrendingUpIcon />}
      title="Income"
      amount="—"
      subtitle="Unable to load"
      cardAccent="success"
    />
    <OverviewCard
      icon={<TrendingDownIcon />}
      title="Expenses"
      amount="—"
      subtitle="Unable to load"
      cardAccent="danger"
    />
  </Root>
);
