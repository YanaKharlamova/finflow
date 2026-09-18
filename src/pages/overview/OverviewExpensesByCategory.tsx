import { Header, Root } from "src/pages/overview/OverviewCashFlowCharts.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import {
  ExpensesByCategoryContent,
  type ExpensesByCategoryContentProps,
} from "src/pages/overview/ExpensesByCategoryContent";

export const OverviewExpensesByCategory = (
  props: ExpensesByCategoryContentProps,
) => {
  const { dataLoading, dataFetching } = props;

  return (
    <Root
      aria-labelledby="expenses-by-category-title"
      aria-busy={dataLoading || dataFetching}
    >
      <Header>
        <Typography id="expenses-by-category-title" as="h2" variant="subtitle">
          Expenses by category
        </Typography>

        <Typography variant="caption" color="secondary">
          Spending in the selected period
        </Typography>
      </Header>

      <ExpensesByCategoryContent {...props} />
    </Root>
  );
};
