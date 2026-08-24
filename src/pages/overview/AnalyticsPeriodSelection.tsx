import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { PERIOD_OPTIONS } from "src/pages/overview/constants";
import { Select } from "radix-ui";
import {
  ArrowIconStyled,
  ContentStyled,
  ItemStyled,
  SelectionStyled,
  ViewportStyled,
} from "src/pages/overview/AnalyticsPeriodSelection.styled";

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

  const handleChange = (value: string) => {
    setSelectedPeriod(value as PeriodValue);
  };

  return (
    <Select.Root value={selectedPeriod} onValueChange={handleChange}>
      <SelectionStyled aria-label="Analytics period">
        <Select.Value />

        <ArrowIconStyled />
      </SelectionStyled>

      <Select.Portal>
        <ContentStyled
          position="popper"
          side="bottom"
          align="end"
          sideOffset={3}
        >
          <ViewportStyled>
            {PERIOD_OPTIONS.map((option) => {
              const optionLabel = mobile
                ? option.mobileLabel
                : option.desktopLabel;

              return (
                <ItemStyled key={option.value} value={option.value}>
                  <Select.ItemText>{optionLabel}</Select.ItemText>
                </ItemStyled>
              );
            })}
          </ViewportStyled>
        </ContentStyled>
      </Select.Portal>
    </Select.Root>
  );
};
