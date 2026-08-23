import { SelectionStyled } from "src/pages/overview/SelectionStyled.styled";

export const AnalyticsPeriodSelection = () => {
  return (
    <SelectionStyled aria-label="Analytics period" defaultValue="30-days">
      <option value="7-days">Last 7 days</option>
      <option value="30-days">Last 30 days</option>
      <option value="3-months">Last 3 months</option>
      <option value="year">Last year</option>
    </SelectionStyled>
  );
};
