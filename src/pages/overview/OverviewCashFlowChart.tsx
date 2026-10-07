import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CashFlowPoint } from "src/pages/overview/types";
import { useTheme } from "styled-components";
import type { Currency } from "src/shared/types/transaction";
import { formatCurrencyToMajorUnits } from "src/shared/helpers/formatCurrencyToMajorUnits";

type Props = {
  data: CashFlowPoint[];
  currency: Currency;
};

export const OverviewCashFlowChart = ({ data, currency }: Props) => {
  const theme = useTheme();

  const formatYAxisValue = (value: number) =>
    formatCurrencyToMajorUnits({ currency, amount: value });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        accessibilityLayer
        data={data}
        barGap={6}
        margin={{ top: 8, right: 16, bottom: 0, left: 16 }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="4 4"
          stroke={theme.colors.border}
        />

        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tickMargin={12}
          interval="preserveStartEnd"
          tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          tickCount={5}
          width={64}
          tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
          tickFormatter={formatYAxisValue}
        />

        <ReferenceLine y={0} stroke={theme.colors.textSecondary} />

        <Legend
          position="top"
          align="right"
          offset={8}
          iconType="circle"
          iconSize={8}
          height={40}
          wrapperStyle={{
            color: theme.colors.textSecondary,
            fontSize: 12,
          }}
        />

        <Tooltip
          cursor={{ fill: theme.colors.secondary }}
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

        <Bar
          dataKey="incomeMinor"
          name="Income"
          fill={theme.colors.success}
          maxBarSize={22}
          radius={[5, 5, 0, 0]}
        />

        <Bar
          dataKey="expensesMinor"
          name="Expenses"
          fill="#E97866"
          maxBarSize={20}
          radius={[4, 4, 0, 0]}
        />

        <Line
          type="monotone"
          dataKey="netMinor"
          name="Net"
          stroke={theme.colors.tertiary}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          dot={{
            r: 3,
            fill: theme.colors.white,
            strokeWidth: 2,
          }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
