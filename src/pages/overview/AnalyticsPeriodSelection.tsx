import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { PERIOD_OPTIONS } from "src/pages/overview/constants";
import { Select } from "src/shared/ui/ui-kit/Select";

export type PeriodValue = (typeof PERIOD_OPTIONS)[number]["value"];

type Options = {
  selectedPeriod: PeriodValue;
  setSelectedPeriod: (period: PeriodValue) => void;
};

export const AnalyticsPeriodSelection = ({
  selectedPeriod,
  setSelectedPeriod,
}: Options) => {
  const mobile = useMediaQuery(`(width < ${BREAKPOINTS.mobileLg}px)`);

  const options = PERIOD_OPTIONS.map((option) => ({
    value: option.value,
    label: mobile ? option.mobileLabel : option.desktopLabel,
  }));

  return (
    <Select
      ariaLabel="Analytics period"
      options={options}
      value={selectedPeriod}
      onValueChange={setSelectedPeriod}
    />
  );
};
