import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { OverviewCategoryList } from "src/pages/overview/OverviewCategoryList";
import { Typography } from "src/shared/ui/ui-kit/Typography";

import {
  EXPENSE_CATEGORY_COLORS,
  EXPENSE_CATEGORY_LABELS,
} from "src/pages/overview/constants";

import { useTheme } from "styled-components";
import { formatCurrencyToMajorUnits } from "src/shared/helpers/formatCurrencyToMajorUnits";
import type { Currency } from "src/pages/transactions/types";
import type { ExpenseCategoryPoint } from "src/pages/overview/types";
import {
  CategoryChart,
  ChartTotal,
  Content,
} from "src/pages/overview/OverviewExpensesChart.styled";

type Props = {
  totalExpensesMinor: number;
  currency: Currency;
  data: ExpenseCategoryPoint[];
};

export const OverviewExpensesChart = ({
  totalExpensesMinor,
  currency,
  data,
}: Props) => {
  const theme = useTheme();

  const formattedTotal = formatCurrencyToMajorUnits({
    currency,
    amount: totalExpensesMinor,
  });

  const chartData = data.map((item) => ({
    ...item,
    label: EXPENSE_CATEGORY_LABELS[item.category],
    fill: EXPENSE_CATEGORY_COLORS[item.category],
  }));

  return (
    <Content>
      <CategoryChart>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart accessibilityLayer>
            <Pie
              data={chartData}
              dataKey="amountMinor"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius="62%"
              outerRadius="88%"
            />

            <Tooltip
              cursor={false}
              contentStyle={{
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radii.md,
                boxShadow: "0 8px 24px rgb(23 34 59 / 10%)",
              }}
              labelStyle={{
                color: theme.colors.textPrimary,
                fontWeight: 600,
              }}
              formatter={(value) => {
                const amount = Number(value);

                return Number.isFinite(amount)
                  ? formatCurrencyToMajorUnits({ currency, amount })
                  : "-";
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <ChartTotal direction="column" align="center" gap="xs">
          <Typography variant="title">{formattedTotal}</Typography>
          <Typography variant="bodyText" color="secondary">
            Total expenses
          </Typography>
        </ChartTotal>
      </CategoryChart>

      <OverviewCategoryList
        data={data}
        currency={currency}
        totalExpensesMinor={totalExpensesMinor}
      />
    </Content>
  );
};
