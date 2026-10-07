import { SkeletonRoot } from "src/pages/overview/OverviewCard.styled";
import { Root } from "src/pages/overview/OverviewTransactionsCards.styled";

export const OverviewCardsSkeleton = () => (
  <Root aria-busy="true">
    {Array.from({ length: 3 }, (_, index) => (
      <SkeletonRoot key={index} aria-hidden="true" />
    ))}
  </Root>
);
