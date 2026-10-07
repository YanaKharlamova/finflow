import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { PERIOD_OPTIONS } from "src/pages/overview/constants";
import { Select } from "src/shared/ui/ui-kit/Select";
import type { PeriodValue } from "src/pages/overview/types";

type Props = {
  selectedPeriod: PeriodValue;
  onPeriodChange: (period: PeriodValue) => void;
};

export const AnalyticsPeriodSelection = ({
  selectedPeriod,
  onPeriodChange,
}: Props) => {
  const mobile = useMediaQuery(`(width < ${BREAKPOINTS.mobileLg}px)`);

  const options = PERIOD_OPTIONS.map((option) => ({
    value: option.value,
    label: option.desktopLabel,
    valueLabel: mobile ? option.mobileLabel : undefined,
  }));

  return (
    <Select
      ariaLabel="Analytics period"
      options={options}
      value={selectedPeriod}
      onValueChange={onPeriodChange}
    />
  );
};
