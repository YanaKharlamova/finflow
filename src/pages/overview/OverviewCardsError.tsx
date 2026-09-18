import { OverviewCard } from "src/pages/overview/OverviewCard";
import { Root } from "src/pages/overview/OverviewTransactionsCards.styled";
import { DollarCircleIcon } from "src/shared/ui/icons/DollarCircleIcon";
import { TrendingUpIcon } from "src/shared/ui/icons/TrendingUpIcon";
import { TrendingDownIcon } from "src/shared/ui/icons/TrendingDownIcon";

type Props = {
  dataFetching: boolean;
};

export const OverviewCardsError = ({ dataFetching }: Props) => (
  <Root role="alert" aria-busy={dataFetching}>
    <OverviewCard
      icon={<DollarCircleIcon />}
      title="Current balance"
      amount="—"
      badgeText="All time"
      subtitle="Unable to load"
      dataFetching={dataFetching}
    />
    <OverviewCard
      icon={<TrendingUpIcon />}
      title="Income"
      amount="—"
      subtitle="Unable to load"
      dataFetching={dataFetching}
    />
    <OverviewCard
      icon={<TrendingDownIcon />}
      title="Expenses"
      amount="—"
      subtitle="Unable to load"
      dataFetching={dataFetching}
    />
  </Root>
);
